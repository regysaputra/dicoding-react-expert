describe("Voting", () => {
  const testUser = {
    name: "Regy",
    email: `regy_ci_tester@gmail.com`,
    password: "password123",
  };

  beforeEach("Login, Create Thread, and Create Comment", () => {
    // ===================== LOGIN =================================
    cy.visit("http://localhost:5173/login");
    cy.get('[data-cy="email"]').type(testUser.email);
    cy.get('[data-cy="password"]').type(testUser.password);
    cy.get('[data-cy="loginButton"]').click();
    cy.url().should("eq", "http://localhost:5173/");

    // ====================== CREATE THREAD ========================
    cy.get('[data-cy="create-thread-link"]').click();

    const threadTitle = `My Cypress Test Thread ${Date.now()}`;

    cy.url().should("eq", "http://localhost:5173/threads/new");

    cy.get('[data-cy="thread-title-input"]').type(threadTitle);
    cy.get('[data-cy="thread-category-input"]').type("Testing");
    cy.get("[data-cy='thread-body-input']").type("This is a test thread.");
    cy.get("[data-cy='thread-submit-button']").click();
    cy.url().should("eq", "http://localhost:5173/");
    cy.contains(threadTitle).first().click();

    // ==========================================
    // STEP 3: HUMAN COMMENT CREATION
    // ==========================================
    // Wait for the thread detail page to load
    cy.intercept("GET", "**/threads/*").as("getThreadDetail");
    cy.wait("@getThreadDetail");

    const commentText = `This is an automated Cypress comment! ${Date.now()}`;
    cy.get('[data-cy="comment-content-input"]').type(commentText);

    // Submit
    cy.get('[data-cy="comment-submit-button"]').contains("Post").click();

    // Verify it appeared
    cy.contains(commentText).should("be.visible");

    cy.intercept("POST", "**/threads/*/up-vote").as("upvoteCall");
    cy.intercept("POST", "**/threads/*/down-vote").as("downvoteCall");
    cy.intercept("POST", "**/threads/*/neutral-vote").as("neutralvoteCall");
    cy.intercept("POST", "**/comments/**/up-vote").as("commentUpvoteCall");
    cy.intercept("POST", "**/comments/**/down-vote").as("commentDownvoteCall");
    cy.intercept("POST", "**/comments/**/neutral-vote").as(
      "commentNeutralvoteCall",
    );
    // cy.wait("@getThreadDetail");
  });

  it("should handle the complete thread voting journey", () => {
    // Upvote (start from a neutral state)
    cy.get('[data-cy="thread-upvote-button"]').should("be.visible");
    cy.get('[data-cy="thread-upvote-button"]').should(
      "have.attr",
      "data-voted",
      "false",
    );
    cy.get("[data-cy='thread-upvote-count']")
      .invoke("text")
      .then((text) => {
        const upvoteCount = parseInt(text.trim(), 10) || 0;
        cy.get('[data-cy="thread-upvote-button"]').click();
        cy.wait("@upvoteCall");

        cy.waitForNetworkIdle(500);

        cy.get('[data-cy="thread-upvote-button"]').should(
          "have.attr",
          "data-voted",
          "true",
        );

        cy.get('[data-cy="thread-upvote-count"]')
          .invoke("text")
          .then((text) => {
            const newCount = parseInt(text.trim(), 10) || 0;
            expect(newCount).to.eq(upvoteCount + 1);
          });
      });

    // Switch vote (directly from upvote to downvote)
    cy.get('[data-cy="thread-downvote-button"]').should("be.visible");
    cy.get('[data-cy="thread-downvote-button"]').should(
      "have.attr",
      "data-voted",
      "false",
    );
    cy.get("[data-cy='thread-downvote-count']")
      .invoke("text")
      .then((text) => {
        const downvoteCount = parseInt(text.trim(), 10) || 0;
        cy.get('[data-cy="thread-downvote-button"]').click();
        cy.wait("@downvoteCall");
        cy.waitForNetworkIdle(500);
        cy.get('[data-cy="thread-downvote-button"]').should(
          "have.attr",
          "data-voted",
          "true",
        );
        cy.get('[data-cy="thread-downvote-count"]')
          .invoke("text")
          .then((text) => {
            const newCount = parseInt(text.trim(), 10);
            expect(newCount).to.eq(downvoteCount + 1);
          });
        cy.get('[data-cy="thread-upvote-button"]').should(
          "have.attr",
          "data-voted",
          "false",
        );
      });

    // neutralize vote (click the downvote button again)
    cy.get("[data-cy='thread-downvote-count']")
      .invoke("text")
      .then((text) => {
        const downvoteCount = parseInt(text.trim(), 10);
        cy.get('[data-cy="thread-downvote-button"]').click();
        cy.wait("@neutralvoteCall");
        cy.waitForNetworkIdle(500);
        cy.get('[data-cy="thread-downvote-button"]').should(
          "have.attr",
          "data-voted",
          "false",
        );
        cy.get('[data-cy="thread-downvote-count"]')
          .invoke("text")
          .then((text) => {
            const newCount = parseInt(text.trim(), 10);
            expect(newCount).to.eq(downvoteCount - 1);
          });
      });
  });

  it("should handle the complete comment voting journey", () => {
    // Upvote (start from a neutral state)
    cy.get('[data-cy="comment-upvote-button"]').first().should("be.visible");
    cy.get('[data-cy="comment-upvote-button"]')
      .first()
      .should("have.attr", "data-voted", "false");
    cy.get("[data-cy='comment-upvote-count']")
      .first()
      .invoke("text")
      .then((text) => {
        const upvoteCount = parseInt(text.trim(), 10) || 0;
        cy.get('[data-cy="comment-upvote-button"]').first().click();
        cy.wait("@commentUpvoteCall");
        cy.waitForNetworkIdle(500);
        cy.get('[data-cy="comment-upvote-button"]')
          .first()
          .should("have.attr", "data-voted", "true");

        cy.get('[data-cy="comment-upvote-count"]')
          .first()
          .invoke("text")
          .then((text) => {
            const newCount = parseInt(text.trim(), 10) || 0;
            expect(newCount).to.eq(upvoteCount + 1);
          });
      });

    // Switch vote (directly from upvote to downvote)
    cy.get('[data-cy="comment-downvote-button"]').first().should("be.visible");
    cy.get('[data-cy="comment-downvote-button"]')
      .first()
      .should("have.attr", "data-voted", "false");
    cy.get("[data-cy='comment-downvote-count']")
      .first()
      .invoke("text")
      .then((text) => {
        const downvoteCount = parseInt(text.trim(), 10) || 0;
        cy.get('[data-cy="comment-downvote-button"]').first().click();
        cy.wait("@commentDownvoteCall");
        cy.waitForNetworkIdle(500);
        cy.get('[data-cy="comment-downvote-button"]')
          .first()
          .should("have.attr", "data-voted", "true");
        cy.get('[data-cy="comment-downvote-count"]')
          .first()
          .invoke("text")
          .then((text) => {
            const newCount = parseInt(text.trim(), 10);
            expect(newCount).to.eq(downvoteCount + 1);
          });
        cy.get('[data-cy="comment-upvote-button"]')
          .first()
          .should("have.attr", "data-voted", "false");
      });

    // neutralize vote (click the downvote button again)
    cy.get("[data-cy='comment-downvote-count']")
      .first()
      .invoke("text")
      .then((text) => {
        const downvoteCount = parseInt(text.trim(), 10);
        cy.get('[data-cy="comment-downvote-button"]').first().click();
        cy.wait("@commentNeutralvoteCall");
        cy.waitForNetworkIdle(500);
        cy.get('[data-cy="comment-downvote-button"]')
          .first()
          .should("have.attr", "data-voted", "false");
        cy.get('[data-cy="comment-downvote-count"]')
          .first()
          .invoke("text")
          .then((text) => {
            const newCount = parseInt(text.trim(), 10);
            expect(newCount).to.eq(downvoteCount - 1);
          });
      });
  });
});
