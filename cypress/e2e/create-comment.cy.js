describe("Create comment", () => {
  // Create unique user
  const testUser = {
    name: "Regy",
    email: `regy_ci_tester@gmail.com`,
    password: "password123",
  };

  beforeEach("Login and Create Thread", () => {
    // 1. Set up our API interceptors BEFORE we do anything
    cy.intercept('POST', '**/login').as('loginCall');
    cy.intercept('GET', '**/threads').as('getThreadsCall');

    // 2. ===================== LOGIN ================================
    cy.visit("http://localhost:5173/login");
    cy.get('[data-cy="email"]').type(testUser.email);
    cy.get('[data-cy="password"]').type(testUser.password);
    cy.get('[data-cy="loginButton"]').click();

    // 3. Wait for the login API to finish returning the token
    cy.wait('@loginCall');
    cy.url().should('eq', 'http://localhost:5173/');

    // 4. Wait for the homepage to finish fetching the threads
    cy.wait('@getThreadsCall');

    // ====================== CREATE THREAD ========================
    // 5. Check if the loading bar is gone (if you use react-redux-loading-bar)
    cy.get('.loading-bar').should('not.exist');

    // 6. NOW look for the button!
    // ⚠️ Double check that "create-thread-link" matches your React code exactly!
    cy.get('[data-cy="create-thread-link"]').should('be.visible').click();

    const threadTitle = `My Cypress Test Thread ${Date.now()}`;

    cy.url().should("eq", "http://localhost:5173/threads/new");

    cy.get('[data-cy="thread-title-input"]').type(threadTitle);
    cy.get('[data-cy="thread-category-input"]').type("Testing");
    cy.get("[data-cy='thread-body-input']").type("This is a test thread.");
    cy.get("[data-cy='thread-submit-button']").click();
    cy.url().should("eq", "http://localhost:5173/");
    cy.contains(threadTitle).first().click();
    cy.intercept('GET', '**/threads/*').as('getThreadDetail');
    cy.wait('@getThreadDetail');
  });

  it("post a comment, and render it", () => {
    cy.url().should("include", "/threads/");

    // Create and type the comment
    const commentText = `This is an automated Cypress comment! ${Date.now()}`;
    cy.get('[data-cy="comment-content-input"]').type(commentText);

    // Submit
    cy.get('[data-cy="comment-submit-button"]').contains("Post").click();

    // Verify it appeared
    cy.contains(commentText).should("be.visible");
  });
});
