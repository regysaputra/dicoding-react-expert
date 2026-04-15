describe("Logout", () => {
  const testUser = {
    name: "Regy",
    email: `regy_ci_tester@gmail.com`,
    password: "password123",
  };

  // before("Register", () => {
  //   cy.request("POST", "https://forum-api.dicoding.dev/v1/register", testUser);
  // });

  beforeEach("Login", () => {
    cy.visit("http://localhost:5173/login");
    cy.get('[data-cy="email"]').type(testUser.email);
    cy.get('[data-cy="password"]').type(testUser.password);
    cy.get('[data-cy="loginButton"]').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it("should logout successfully", () => {
    cy.waitForNetworkIdle(500)

    // Open user dropdown
    cy.get('[data-cy="avatar-button"]').click();

    // Click the logout button
    cy.get('[data-cy="logout-button"]').click();

    // Verify if the url is redirected to the login page
    cy.url().should("include", "/login");

    // Verify if the login button in the header is visible
    cy.get('header').contains("Login");

    // Verify the token is removed from local storage
    cy.window().then((window) => {
      expect(window.localStorage.getItem("accessToken")).to.not.be.ok;
    });
  });
});
