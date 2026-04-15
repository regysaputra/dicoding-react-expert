describe("Create thread", () => {
  // Create unique user
  const testUser = {
    name: "Regy",
    email: `regy_ci_tester@gmail.com`,
    password: "password123",
  };

  beforeEach("Login", () => {
    cy.visit("http://localhost:5173/login");
    cy.get('[data-cy="email"]').type(testUser.email);
    cy.get('[data-cy="password"]').type(testUser.password);
    cy.get('[data-cy="loginButton"]').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it("should display the create thread button, navigate to create thread page, and create a thread", () => {
    // Verify the authenticated UI is visible (login button should not be visible and create thread button should be visible)
    cy.get("header").contains("Login").should("not.exist");

    cy.get('[data-cy="create-thread-link"]').click();

    const threadTitle = `My Cypress Test Thread ${Date.now()}`;

    cy.url().should("eq", "http://localhost:5173/threads/new");

    cy.get('[data-cy="thread-title-input"]').type(threadTitle);
    cy.get('[data-cy="thread-category-input"]').type("Testing");
    cy.get("[data-cy='thread-body-input']").type("This is a test thread.");
    cy.get("[data-cy='thread-submit-button']").click();
    cy.url().should("eq", "http://localhost:5173/");
    cy.contains(threadTitle).should("be.visible");
  });
});
