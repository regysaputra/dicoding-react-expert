describe('Voting', () => {
  const testUser = {
    name: 'Vote Tester',
    email: 'votetester_' + Date.now() + '@gmail.com',
    password: 'password123'
  };

  let token = '';
  let threadId = '';

  before("Register", () => {
    cy.request("POST", "https://forum-api.dicoding.dev/v1/register", testUser);
  });

  beforeEach("Login, Create Thread, and Create Comment", () => {
    cy.request("POST", "https://forum-api.dicoding.dev/v1/login", {
      email: testUser.email,
      password: testUser.password
    }).then((response) => {
      token = response.body.data.token;

      cy.window().then((win) => {
        win.localStorage.setItem('accessToken', token);
      });

      // Create thread
      cy.request({
        method: "POST",
        url: "https://forum-api.dicoding.dev/v1/threads",
        headers: { Authorization: `Bearer ${token}` },
        body: {
          title: "My Cypress Test Thread " + Date.now(),
          body: "This is a test thread.",
          category: "Testing"
        }
      }).then((response) => {
        threadId = response.body.data.thread.id;

        // Create comment
        cy.request({
          method: "POST",
          url: `https://forum-api.dicoding.dev/v1/threads/${threadId}/comments`,
          headers: { Authorization: `Bearer ${token}` },
          body: {
            content: "This is a test comment."
          }
        }).then((response) => {
          cy.visit(`http://localhost:5173/threads/${threadId}`);
          cy.intercept('GET', '**/threads/*').as('getThreadDetail');

          cy.intercept('POST', '**/up-vote').as('upvoteCall');
          cy.intercept('POST', '**/down-vote').as('downvoteCall');
          cy.intercept('POST', '**/neutral-vote').as('neutralvoteCall');
          cy.reload();
        });
      });
    });
  });

  it("should handle the complete thread voting journey", () => {
    // Upvote (start from a neutral state)
    cy.wait('@getThreadDetail');
    cy.wait(500);
    cy.get('[data-cy="thread-upvote-button"]').should('be.visible');
    cy.get('[data-cy="thread-upvote-button"]').should("have.attr", "data-voted", "false");
    cy.get("[data-cy='thread-upvote-count']").invoke("text").then((text) => {
      const upvoteCount = parseInt(text.trim(), 10) || 0;
      cy.get('[data-cy="thread-upvote-button"]').click();
      cy.wait('@upvoteCall').its('response.statusCode').should('be.oneOf', [200, 201]);

      // Wait for stability - check that the value doesn't change for 1 second
      cy.get('[data-cy="thread-upvote-button"]').then(($btn) => {
        const initialValue = $btn.attr('data-voted');

        cy.wait(500);

        cy.get('[data-cy="thread-upvote-button"]').should(($newBtn) => {
          expect($newBtn.attr('data-voted')).to.eq(initialValue);
        });
      });

      cy.get('[data-cy="thread-upvote-button"]')
        .should('have.attr', 'data-voted', 'true');

      cy.get('[data-cy="thread-upvote-count"]').invoke("text").then((text) => {
        const newCount = parseInt(text.trim(), 10) || 0;
        expect(newCount).to.eq(upvoteCount + 1);
      });
    });

    // Switch vote (directly from upvote to downvote)
    cy.get('[data-cy="thread-downvote-button"]').should('be.visible');
    cy.get('[data-cy="thread-downvote-button"]').should("have.attr", "data-voted", "false");
    cy.get("[data-cy='thread-downvote-count']").invoke("text").then((text) => {
      const downvoteCount = parseInt(text.trim(), 10) || 0;
      cy.get('[data-cy="thread-downvote-button"]').click();
      cy.wait('@downvoteCall');
      cy.get('[data-cy="thread-downvote-button"]').should("have.attr", "data-voted", "true");
      cy.get('[data-cy="thread-downvote-count"]').invoke("text").then((text) => {
        const newCount = parseInt(text.trim(), 10);
        expect(newCount).to.eq(downvoteCount + 1);
      });
      cy.get('[data-cy="thread-upvote-button"]').should("have.attr", "data-voted", "false");
    });

    // neutralize vote (click the downvote button again)
    cy.get("[data-cy='thread-downvote-count']").invoke("text").then((text) => {
      const downvoteCount = parseInt(text.trim(), 10);
      cy.get('[data-cy="thread-downvote-button"]').click();
      cy.wait('@neutralvoteCall');
      cy.get('[data-cy="thread-downvote-button"]').should("have.attr", "data-voted", "false");
      cy.get('[data-cy="thread-downvote-count"]').invoke("text").then((text) => {
        const newCount = parseInt(text.trim(), 10);
        expect(newCount).to.eq(downvoteCount - 1);
      });
    });
  });

  it("should handle the complete comment voting journey", () => {
    // Upvote (start from a neutral state)
    cy.wait('@getThreadDetail');
    cy.wait(500);
    cy.get('[data-cy="comment-upvote-button"]').first().should('be.visible');
    cy.get('[data-cy="comment-upvote-button"]').first().should("have.attr", "data-voted", "false");
    cy.get("[data-cy='comment-upvote-count']").first().invoke("text").then((text) => {
      const upvoteCount = parseInt(text.trim(), 10) || 0;
      cy.get('[data-cy="comment-upvote-button"]').first().click();
      cy.wait('@upvoteCall').its('response.statusCode').should('be.oneOf', [200, 201]);
      cy.get('[data-cy="comment-upvote-button"]').first().then(($btn) => {
        const initialValue = $btn.attr('data-voted');

        cy.wait(500);

        cy.get('[data-cy="comment-upvote-button"]').first().should(($newBtn) => {
          expect($newBtn.attr('data-voted')).to.eq(initialValue);
        });
      });

      cy.get('[data-cy="comment-upvote-count"]').first().invoke("text").then((text) => {
        const newCount = parseInt(text.trim(), 10) || 0;
        expect(newCount).to.eq(upvoteCount + 1);
      });
    });

    // Switch vote (directly from upvote to downvote)
    cy.get('[data-cy="comment-downvote-button"]').first().should('be.visible');
    cy.get('[data-cy="comment-downvote-button"]').first().should("have.attr", "data-voted", "false");
    cy.get("[data-cy='comment-downvote-count']").first().invoke("text").then((text) => {
      const downvoteCount = parseInt(text.trim(), 10) || 0;
      cy.get('[data-cy="comment-downvote-button"]').first().click();
      cy.wait('@downvoteCall');
      cy.get('[data-cy="comment-downvote-button"]').first().should("have.attr", "data-voted", "true");
      cy.get('[data-cy="comment-downvote-count"]').first().invoke("text").then((text) => {
        const newCount = parseInt(text.trim(), 10);
        expect(newCount).to.eq(downvoteCount + 1);
      });
      cy.get('[data-cy="comment-upvote-button"]').first().should("have.attr", "data-voted", "false");
    });

    // neutralize vote (click the downvote button again)
    cy.get("[data-cy='comment-downvote-count']").first().invoke("text").then((text) => {
      const downvoteCount = parseInt(text.trim(), 10);
      cy.get('[data-cy="comment-downvote-button"]').first().click();
      cy.wait('@neutralvoteCall');
      cy.get('[data-cy="comment-downvote-button"]').first().should("have.attr", "data-voted", "false");
      cy.get('[data-cy="comment-downvote-count"]').first().invoke("text").then((text) => {
        const newCount = parseInt(text.trim(), 10);
        expect(newCount).to.eq(downvoteCount - 1);
      });
    });
  });
});