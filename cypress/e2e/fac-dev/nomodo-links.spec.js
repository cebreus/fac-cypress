let sitemapUrls = [];

Cypress.Commands.add('redirectTest', (url, expectUrl, expectStatus) => {
  cy.request({
    url,
    followRedirect: false,
    failOnStatusCode: false,
  }).then((response) => {
    cy.log(`Response status: ${response.status}`);
    expect(response.status).to.equal(expectStatus);
    if (!Array.isArray(response.redirects) || response.redirects.length === 0)
      return;
    const redirectUrl = response.redirects[0];
    cy.log(`got: ${redirectUrl}  expected: ${expectUrl}`);
    expect(redirectUrl).to.equal(expectUrl);
  });
});

Cypress.Commands.add('getUrlsFromSitemap', (sitemapUrl) => {
  return cy.request(sitemapUrl).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Failed to fetch sitemap: ${response.status}`);
    }
    const urls = Cypress.$(response.body)
      .find('loc')
      .map((i, el) => Cypress.$(el).text())
      .get();
    if (urls.length === 0) {
      throw new Error(`No URLs found in sitemap`);
    }
    return urls;
  });
});

before(() => {
  cy.getUrlsFromSitemap('https://nomodo.io/sitemap.xml').then((urls) => {
    sitemapUrls = urls;
  });
});

describe('❗ MANUAL Open Graph Validation', () => {
  it('Open https://developers.facebook.com/tools/debug/sharing/batch/', () => {
    cy.log(`Paste: ${sitemapUrls.join(' ')}`);
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

describe('3️⃣ Internal links check', () => {
  const baseUrl = 'https://nomodo.io';

  it('checks all internal links for status code 200 without redirects', () => {
    cy.visit(baseUrl)
      .get('#CybotCookiebotDialogBodyButtonDecline')
      .then(($declineBtn) => {
        if ($declineBtn.length) {
          cy.get('#CybotCookiebotDialogBodyButtonDecline').click();
        }
      });

    cy.get(
      'a[href^="/"]:not([href="/"]):not([href^="."]):not([href^="#"])'
    ).each(($el) => {
      const link = $el.prop('href');
      cy.log(`Checking link: ${link}`);
      cy.request({
        url: link,
        followRedirect: false,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(
          200,
          `Link: ${link} returned status code: ${response.status}`
        );
        expect(response.headers.location).to.be.undefined;
      });
    });

    cy.get(
      'div[id], section[id], header[id], footer[id], article[id], main[id], nav[id], aside[id], figure[id], figcaption[id], h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'
    ).then((elements) => {
      const uniqueElements = [];
      elements.toArray().forEach(function (element) {
        const id = element.getAttribute('id');
        if (
          !id.startsWith('svelte-') &&
          !id.includes('.') &&
          !id.includes('Cookiebot')
        ) {
          if (uniqueElements.indexOf(id) === -1) {
            uniqueElements.push(id);
          } else {
            cy.log(`Error: Duplicate ID attribute found: ${id}`);
          }
        }
      });

      if (elements.length === uniqueElements.length) {
        cy.log('Success: All elements have unique ID attributes');
      }

      cy.get('a[href^="#"]:not(a[href="/"])').then(($anchors) => {
        $anchors.toArray().forEach(function (anchor) {
          const href = anchor.getAttribute('href');
          const correspondingElement = elements.toArray().filter((element) => {
            return element.getAttribute('id') === href.slice(1);
          });

          if (correspondingElement.length) {
            cy.log(
              `Success: Anchor with href '${href}' has corresponding element with ID attribute '${href.slice(
                1
              )}'`
            );
          } else {
            cy.log(
              `Error: Anchor with href '${href}' does not have a corresponding element with ID attribute '${href.slice(
                1
              )}'`
            );
          }
        });
      });
    });
  });
});

describe('4️⃣ External links on https://nomodo.io', () => {
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
    sitemapUrls.forEach((url) => {
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
  });
});
