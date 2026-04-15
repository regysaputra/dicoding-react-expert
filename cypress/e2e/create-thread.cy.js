describe("Create thread", () => {
  // Create unique user
  const testUser = {
    name: "Regy",
    email: `regy_ci_tester@gmail.com`,
    password: "password123",
  };

  // before("Register", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "https://forum-api.dicoding.dev/v1/register",
  //     body: testUser,
  //   });
  // });

  beforeEach("Login", () => {
    cy.request({
      method: "POST",
      url: "https://forum-api.dicoding.dev/v1/login",
      body: {
        email: testUser.email,
        password: testUser.password,
      },
    }).then((response) => {
      const { token } = response.body.data;
      window.localStorage.setItem("accessToken", token);
      cy.visit("http://localhost:5173/");
      cy.intercept("POST", "**/threads").as("createThread");
      cy.reload();
    });
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
    cy.wait("@createThread");
    cy.waitForNetworkIdle(500);
    cy.contains(threadTitle).should("be.visible");
  });
});
