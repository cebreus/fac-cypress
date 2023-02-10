describe('Test nomodo.io web', () => {
  Cypress.Commands.add('redirectTest', (url, expectUrl, expectStatus) => {
    // Make a request to the specified URL, with followRedirect set to false and failOnStatusCode set to false
    cy.request({
      url,
      followRedirect: false,
      failOnStatusCode: false,
    }).then((response) => {
      // Log the response status code
      cy.log(`Response status: ${response.status}`);

      // Expect the response status to equal the expected status code
      expect(response.status).to.equal(expectStatus);

      // If there are no redirects, return
      if (!Array.isArray(response.redirects) || response.redirects.length === 0)
        return;

      // If there are redirects, get the first one
      const redirectUrl = response.redirects[0];

      // Log the expected and actual redirect URLs
      cy.log(`got: ${redirectUrl}  expected: ${expectUrl}`);

      // Expect the first redirect URL to equal the expected URL
      expect(redirectUrl).to.equal(expectUrl);
    });
  });

  describe('1️⃣ Test old domains redirects', () => {
    const targetUrl = 'https://nomodo.io';
    const testDomains = ['fastandcomfy.io', 'fastandcomfy.com'];
    const protocols = ['http', 'https'];

    testDomains.forEach((thisDomain) => {
      protocols.forEach((thisProtocol) => {
        const testUrls = [
          `${thisProtocol}://${thisDomain}`,
          `${thisProtocol}://${thisDomain}/`,
          `${thisProtocol}://www.${thisDomain}`,
          `${thisProtocol}://www.${thisDomain}/`,
        ];

        testUrls.forEach((url) => {
          it(`checks if redirect from ${url} to ${targetUrl} is 301`, () => {
            cy.request({
              url,
              followRedirect: false,
              failOnStatusCode: false,
            }).then((response) => {
              expect(response.status).to.eq(301);
              expect(response.headers.location).to.eq(targetUrl);
            });
          });
        });
      });
    });
  });

  describe('2️⃣ Test redirects on *nomodo.io*', () => {
    const targetUrl = 'https://nomodo.io';
    const testDomains = ['nomodo.io', 'www.nomodo.io'];
    const protocols = ['http', 'https'];

    testDomains.forEach((thisDomain) => {
      protocols.forEach((thisProtocol) => {
        const isHttps = thisProtocol === 'https';
        const isNonWWW = !thisDomain.startsWith('www.');
        const hasSlash = !thisDomain.endsWith('/');
        const expectedStatus = isHttps && isNonWWW && hasSlash ? 200 : 301;

        const testCases = [
          { url: `${thisProtocol}://${thisDomain}`, status: expectedStatus },
          { url: `${thisProtocol}://${thisDomain}/`, status: expectedStatus },
        ];

        testCases.forEach(({ url, status }) => {
          it(`checks if ${url} has expected status code`, () => {
            cy.log(`${url}  [${status} ]> ${targetUrl}`);
            cy.request({
              url,
              followRedirect: false,
              failOnStatusCode: false,
            }).then((response) => {
              expect(response.status).to.eq(status);
              if (status === 301) {
                expect(response.headers.location).to.eq(targetUrl);
              }
            });
          });
        });
      });
    });
  });

  describe('3️⃣ External links on https://nomodo.io', () => {
    it('should find all functional external links', () => {
      const errors = [];
      const testedUrls = new Set();

      cy.visit('https://nomodo.io');

      cy.get('a[href^="http"]').each(($link) => {
        const linkUrl = $link.prop('href');

        if (!testedUrls.has(linkUrl)) {
          testedUrls.add(linkUrl);
          cy.request({
            url: linkUrl,
            followRedirect: true,
            failOnStatusCode: false,
          }).then((response) => {
            if (response.status !== 200) {
              errors.push(
                `${linkUrl} returned a ${response.statusCode} status code.`
              );
            }
          });
        }
      });

      cy.wrap(errors).should('be.empty', () => {
        errors.forEach((error) => {
          cy.log(error);
        });

        return `There were ${errors.length} errors.`;
      });
    });
  });

  describe('5️⃣ Check sitemap.xml', () => {
    it('Visits each URL in sitemap.xml and checks meta robots tag', () => {
      cy.request({
        url: 'https://nomodo.io/sitemap.xml',
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status === 200) {
          const xml = response.body;
          const parser = new DOMParser();
          const doc = parser.parseFromString(xml, 'text/xml');
          const urls = Array.from(doc.querySelectorAll('loc')).map(
            (node) => node.textContent
          );
          urls.forEach((url) => {
            cy.visit(url).then(() => {
              cy.get('meta[name="robots"]')
                .should('have.attr', 'content')
                .and((content) => {
                  expect(content).to.include('index');
                  expect(content).to.not.include('noindex');
                });
              cy.get('meta[name="googlebot"]')
                .should('have.attr', 'content')
                .and((content) => {
                  expect(content).to.include('index');
                  expect(content).to.not.include('noindex');
                });
            });
          });
        } else {
          throw new Error(
            `Sitemap.xml file does not exist or returned a status code of ${response.status}.`
          );
        }
      });
    });
  });
});
