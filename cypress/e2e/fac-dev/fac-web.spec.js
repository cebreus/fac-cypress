describe('Test FAC web', () => {
  const fbAppId = '677275829755694';
  const ogSiteName = 'Fast and Comfy Technologies';
  const rootDev = 'https://developersdev.fastandcomfy.io';
  const rootApi = 'https://api-dev.fastandcomfy.io';
  const rootWeb = 'https://fastandcomfy.io';
  const rootWizard = 'https://wizarddev.fastandcomfy.io';

  const appTileUrls = [];
  const internalUrls = [];
  const externalUrls = [];
  const responseCheck = [
    {
      url: 'https://fastandcomfy.io/',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 200,
      title: 'Revolution of Hosting',
      description:
        'We’re hosting apps and services that are ready for you to use in an instant. No need for installation, configuration or worrying. Just what you need in a matter of seconds. It’s fast and comfy.',
      h1: 'Revolution of Hosting',
      robots: 'index,follow',
      canonical: 'https://fastandcomfy.io/',
      og: true,
      ogType: 'website',
      ogTitle: 'Fast and Comfy Technologies',
      ogDescription:
        'Any server uptime in 3 seconds. No installation, configuration, or maintenance.',
      ogImage:
        'https://res.cloudinary.com/fastandcomfy/image/upload/v1606512896/open-graph/fac-og.png',
      ogImageAlt: 'Revolution of Hosting',
    },
    {
      url: 'http://fastandcomfy.io',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 301,
    },
    {
      url: 'http://fastandcomfy.io/',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 301,
    },
    {
      url: 'http://www.fastandcomfy.io',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 301,
    },
    {
      url: 'http://www.fastandcomfy.io/',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 301,
    },
    {
      url: 'https://fastandcomfy.io',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: '200',
    },
    {
      url: 'https://www.fastandcomfy.io',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 301,
    },
    {
      url: 'https://www.fastandcomfy.io/',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 301,
    },
    {
      url: 'https://fastandcomfy.io/postgresql/',
      expectUrl: 'https://fastandcomfy.io/postgresql/',
      expectStatus: '200',
    },
    {
      url: 'https://fastandcomfy.io/postgresql',
      expectUrl: 'https://fastandcomfy.io/postgresql/',
      expectStatus: 301,
    },
    {
      url: 'http://fastandcomfy.io/contact',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 404,
    },
    {
      url: 'http://fastandcomfy.io/contact/',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 404,
    },
    {
      url: 'http://www.fastandcomfy.io/contact',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 404,
    },
    {
      url: 'http://www.fastandcomfy.io/contact/',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 404,
    },
    {
      url: 'https://fastandcomfy.io/contact',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 404,
    },
    {
      url: 'https://fastandcomfy.io/contact/',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 404,
    },
    {
      url: 'https://www.fastandcomfy.io/contact',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 404,
    },
    {
      url: 'https://www.fastandcomfy.io/contact/',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 404,
    },
    {
      url: 'https://fastandcomfy.io/submit-your-idea',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 404,
    },
    {
      url: 'https://fastandcomfy.io/submit-your-idea/',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 404,
    },
    {
      url: 'https://fastandcomfy.io/help',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 404,
    },
    {
      url: 'https://fastandcomfy.io/help/',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 404,
    },
    {
      url: 'https://fastandcomfy.io/pricing',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 404,
    },
    {
      url: 'https://fastandcomfy.io/pricing/',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 404,
    },
    {
      url: 'https://fastandcomfy.io/blog',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 404,
    },
    {
      url: 'https://fastandcomfy.io/blog/',
      expectUrl: 'https://fastandcomfy.io/',
      expectStatus: 404,
    },
  ];

  // it('Visits page', () => {
  //   cy.intercept(rootWeb).as('home')
  //   cy.visit(rootWeb)
  //   cy.wait('@home')
  //     .then((intercept) => {
  //       const {
  //         statusCode
  //       } = intercept.response
  //       expect(statusCode).to.eq(200)
  //     })
  // })

  // beforeEach(() => {
  //   cy.intercept(`${Cypress.config('baseUrl')}**`, req => {
  //     req.headers["accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
  //     req.headers["accept-encoding"] = "gzip, deflate, sdch, br"
  //     req.headers["accept-language"] = "en-US,en;q=0.8,ms;q=0.6"
  //     req.headers["user-agent"] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
  //   })
  // })

  // it('_get external links', () => {
  //   cy.intercept(rootWeb).as('home')
  //   cy.visit(rootWeb)
  //   cy.get('a[href^="http"]')
  //     .each(page => {
  //       externalUrls.push(page.prop('href'))
  //     })
  // });

  // it('_get internal links', () => {
  //   cy.intercept(rootWeb).as('home')
  //   cy.visit(rootWeb)
  //   cy.get('a[href^="/"]')
  //     .each(page => {
  //       internalUrls.push(page.prop('href'))
  //     })
  // });

  // it('_get app links', () => {
  //   cy.intercept(rootWeb).as('home')
  //   cy.visit(rootWeb)
  //   cy.get('.app-tile-cta')
  //     .each(link => {
  //       appTileUrls.push(link.prop('href'))
  //     })
  // });

  // it('Internal link HTTP status', () => {
  //   cy.wrap(internalUrls).each(uri => {
  //     cy.request({
  //       url: uri,
  //       failOnStatusCode: false
  //     })
  //       .then((response) => {
  //         expect(response.status).to.eq(200)
  //       })
  //   })
  // })

  // it('External link HTTP status', () => {
  //   cy.wrap(externalUrls).each(url => {
  //     cy.request({
  //       method: 'GET',
  //       url: url,
  //       failOnStatusCode: false,
  //       headers: {
  //         "accept-encoding": "gzip, deflate, sdch, br",
  //         "accept-language": "en-US,en;q=0.8,ms;q=0.6",
  //         "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  //         "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
  //       }
  //     })
  //       .then((response) => {
  //         expect(response.status).to.eq(200)
  //       })
  //   })
  // })

  // it('App tiles', () => {
  //   cy.intercept(rootWeb).as('home')
  //   cy.visit(rootWeb)
  //   cy.get('.app-tile-cta')
  //     .should('contain', 'Run')
  //   cy.get('.footer .button-primary-light')
  //     .should('contain', 'Run')
  // })

  // it('Check HTTP status', () => {
  //   cy.wrap(responseCheck).each(data => {

  //     cy.request({
  //       url: data.url,
  //       followRedirect: true,
  //       failOnStatusCode: false,
  //     })
  //       .then((response) => {
  //         let redirectStatus = response.redirects[0].split(':')[0];
  //         let redirectUrl = response.redirects[0].split(':')[1];

  //         if (redirectStatus !== data.expectStatus) {
  //           cy.log(`${redirectStatus} !== ${data.expectStatus}`)
  //           cy.log(`${response} !== ${data.expect}`)
  //           cy.log(response.redirects[0].split(':')[0])
  //           return
  //         }

  //       })
  //   })
  // })

  describe('Check HTTP status & page content', () => {
    responseCheck.forEach((pageObj) => {
      it(`Page on "${pageObj.url}"`, () => {
        cy.visit(pageObj.url, {
          failOnStatusCode: false,
        });

        cy.url().should('be.equals', pageObj.expectUrl);

        // Metadata existence

        cy.get('head').find('title').should('have.length', 1);
        cy.get('head').find('meta[name=description]').should('have.length', 1);
        cy.get('head').find('meta[name=robots]').should('have.length', 1);
        cy.get('head').find('link[rel=canonical]').should('have.length', 1);

        cy.get('body').find('h1').should('have.length', 1);

        // Metadata content

        if (pageObj.title) {
          cy.title().should('include', pageObj.title);
        }
        if (pageObj.description) {
          cy.get('head meta[name=description]')
            .should('have.attr', 'content')
            .should('include', pageObj.description);
        }
        if (pageObj.robots) {
          cy.get('head meta[name=robots]')
            .should('have.attr', 'content')
            .should('include', pageObj.robots);
        }
        if (pageObj.canonical) {
          cy.get('head link[rel=canonical]')
            .should('have.attr', 'href')
            .should('include', pageObj.canonical);
        }

        // Open Graph

        if (pageObj.og) {
          cy.get('head meta[property="og:url"]')
            .should('have.attr', 'content')
            .should('be.equal', pageObj.expectUrl);
          cy.get('head meta[property="fb:app_id"]')
            .should('have.attr', 'content')
            .should('be.equal', fbAppId);
          cy.get('head meta[property="og:site_name"]')
            .should('have.attr', 'content')
            .should('be.equal', ogSiteName);
          cy.get('head meta[property="og:type"]')
            .should('have.attr', 'content')
            .should('be.equal', pageObj.ogType);
          cy.get('head meta[property="og:title"]')
            .should('have.attr', 'content')
            .should('be.equal', pageObj.ogTitle);
          cy.get('head meta[property="og:description"]')
            .should('have.attr', 'content')
            .should('be.equal', pageObj.ogDescription);

          if (pageObj.ogImage) {
            cy.get('head meta[property="og:image"]')
              .should('have.attr', 'content')
              .should('be.equal', pageObj.ogImage);
            cy.request({
              url: pageObj.ogImage,
            }).then((response) => {
              expect(response.status).to.eq(200);
              expect(!response.redirects);
            });
            cy.get('head meta[property="og:image:alt"]')
              .should('have.attr', 'content')
              .should('be.equal', pageObj.ogImageAlt);
          }
        }

        // Content

        if (pageObj.h1) {
          cy.get('h1')
            .should('have.attr', 'href')
            .should('include', pageObj.canonical);
        }
      });
    });
  });

  // it('apps', () => {
  // 	cy
  // 		.get('[data-cy="AppTile"]:not([href^="/postgresql"]):not([href^="/mysql"]):not([href^="/redis"]):not([href^="/mongodb"] .btn)')
  // 		.should('contain', 'Show')
  // })

  // const appTiles = ['postgresql', 'mysql', 'mysql', 'redis', 'mongodb'];

  // for (let index = 0; index < appTiles.length; index++) {
  //   const element = array[index];
  //   console.log(element);

  // }

  // it('AppTile PostgreSQL', () => {
  //   cy
  //     .get('[data-cy="AppTile"][href="/postgresql/"] .btn')
  //     .should('contain', 'Run')
  // })

  // it('AppTile MySQL', () => {
  //   cy
  //     .get('[data-cy="AppTile"][href="/mysql/"] .btn')
  //     .should('contain', 'Run')
  // })

  // it('AppTile Redis', () => {
  //   cy
  //     .get('[data-cy="AppTile"][href="/redis/"] .btn')
  //     .should('contain', 'Run')
  // })

  // it('AppTile MongoDB', () => {
  //   cy
  //     .get('[data-cy="AppTile"][href="/mongodb/"] .btn')
  //     .should('contain', 'Run')
  // })

  // it('Run PostgreSQL', () => {
  //   cy
  //     .get('[data-cy="AppTile"][href="/postgresql/"] .btn')
  //     .click()
  //     .get('.btn-success').then(($btn) => {
  //       cy.wrap($btn).should('contain', 'Run')
  //       cy.wrap($btn).click()
  //     })
  //     .wait(5000)
  //     .get('.c-app-starter--done')
  //     .should('be.visible')
  //     .should('contain', 'App ID')
  // })

  // it('Go to Contact from top menu', () => {
  //   cy
  //     .get('.c-menu__label')
  //     .click()
  //     .get('.u-link[href="/contact"]').then(($btn) => {
  //       cy.wrap($btn).should('contain', 'Contact')
  //       cy.wrap($btn).click()
  //     })
  //     .wait(1000)
  //     .get('h1.c-header__title')
  //     .should('have.text', 'Contact')
  // })

  // it('Visits FAC Contact', () => {
  //   cy.visit(rootWeb + "/contact")
  // })

  // it('Send contact form', () => {
  //   cy
  //     .get('[data-cy="FormContact"]')
  //     .should('be.visible')
  //     .get('#email').then(($input) => {
  //       cy.wrap($input).should('have.attr', 'required')
  //     })
  //     .get('.btn-success').then(($btn) => {
  //       cy.wrap($btn).should('be.visible').should('contain', 'Submit').should('have.attr', 'disabled')
  //     })
  //     .wait(3000)
  //     .get('#email').then(($input) => {
  //       cy.wrap($input).focus().type('me@cebre.us')
  //     })
  //     .get('.btn-success').then(($btn) => {
  //       cy.wrap($btn).not('disabled')
  //       cy.wrap($btn).click()
  //     })
  //     .wait(3000)
  //     .get('[data-cy="Alert"].alert-success').should('be.visible').should('contain', 'Thank you for your message!')
  // })

  // it('Visits FAC Submit idea', () => {
  //   cy.visit(rootWeb + "/submit-your-idea")
  // })

  // it('Button Submit your idea', () => {
  //   cy
  //     .get('[data-cy="submit-your-idea"]')
  //     .should('be.visible')
  //     .should('have.class', 'btn-secondary')
  //     .should('have.text', 'Submit your idea')
  //     .should('have.attr', 'href', "mailto:info@fastandcomfy.io?subject=New%20idea%20for%20project%20or%20app&body=%0D%0A%0D%0A—%0D%0AFrom%20" + rootWeb + "/submit-your-idea")
  // })

  // it('Visits FAC Strapi', () => {
  //   cy.visit(rootWeb + "/strapi/")
  // })

  // it('Send Strapi interest', () => {
  //   cy
  //     .get('.btn-success').then(($btn) => {
  //       cy.wrap($btn).should('contain', 'I want this')
  //       cy.wrap($btn).click()
  //     })
  //     .wait(3000)
  //     .get('[data-cy="FormContact"]')
  //     .should('be.visible')
  //     .get('#email').then(($input) => {
  //       cy.wrap($input).should('have.attr', 'required')
  //     })
  //     .get('.btn-success').then(($btn) => {
  //       cy.wrap($btn).should('be.visible').should('contain', 'Submit')
  //         .should('have.attr', 'disabled')
  //     })
  //     .wait(3000)
  //     .get('#email').then(($input) => {
  //       cy.wrap($input).focus().type('me@cebre.us')
  //     })
  //     .get('.btn-success').then(($btn) => {
  //       cy.wrap($btn).not('disabled')
  //       cy.wrap($btn).click()
  //     })
  //     .wait(3000)
  //     .get('[data-cy="Alert"].alert-success').should('be.visible')
  //     .should('contain', 'Thank you for your interest!')
  // })

  // it('Button Eager Write tu us', () => {
  //   cy
  //     .get('[data-cy="eager-app"]')
  //     .should('be.visible')
  //     .should('have.text', 'Write to us.')
  //     .should('have.attr', 'href', "mailto:info@fastandcomfy.io?subject=strapi%20—%20fastandcomfy.io&amp;body=%0D%0A%0D%0A—%0D%0AFrom%20" + rootWeb + "/strapi")
  // })

  // it('Visits FAC FAQ', () => {
  //   cy.visit(rootWeb + "/help")
  // })

  // it('Button Resources', () => {
  //   cy
  //     .get('[data-cy="HeaderPerex"] [href*="developers"]')
  //     .should('be.visible')
  //     .should('have.text', 'Resources for developers')
  //     .should('have.attr', 'href', rootDev)
  //     .should('have.class', 'btn-secondary')
  // })

  // it('Button Pricing', () => {
  //   cy
  //     .get('[data-cy="HeaderPerex"] [href*="pricing"]')
  //     .should('be.visible')
  //     .should('have.text', 'Pricing')
  //     .should('have.class', 'btn-link')
  //     .should('have.class', 'btn-white')
  //     .should('have.attr', 'href', '/pricing')
  // })

  // it('Visits FAC Procong', () => {
  //   cy.visit(rootWeb + "/pricing")
  // })

  // it('Link: suggestions and comments', () => {
  //   cy
  //     .get('a')
  //     .contains('suggestions and comments')
  //     .should('be.visible')
  //     .should('have.class', 'link-white')
  //     .should('have.attr', 'href', "mailto:info@fastandcomfy.io?subject=New%20idea%20for%20project%20or%20app&body=%0D%0A%0D%0A%E2%80%94%0D%0AFrom%20" + rootWeb + "/pricing")
  // })

  // it('Link: Contact us', () => {
  //   cy
  //     .get('a')
  //     .contains('Contact us')
  //     .should('be.visible')
  //     .should('have.class', 'link-white')
  //     .should('have.attr', 'href', '/contact')
  // })

  // it('Link: public API', () => {
  //   cy
  //     .get('a')
  //     .contains('public API')
  //     .should('be.visible')
  //     .should('have.class', 'link-white')
  //     .should('have.attr', 'href', rootApi)
  // })
});
