describe("Register spec", () => {
  const testUser = {
    name: "Regy",
    email: `regy_ci_tester@gmail.com`,
    password: "password123",
  };

  // before(() => {
  //   // Seed db
  //   cy.request(
  //     "POST",
  //     "https://forum-api.dicoding.dev/v1/register",
  //     testUser,
  //   ).then((response) => {
  //     // Optional: Verify the database actually created the user
  //     expect(response.status).to.eq(201);
  //   });
  // });

  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
  });

  it("should display login page correctly", () => {
    cy.get('[data-cy="email"]').should("be.visible");
    cy.get('[data-cy="password"]').should("be.visible");
    cy.get('[data-cy="loginButton"]').should("be.visible");
  });

  it("should show alert if user input wrong credentials", () => {
    cy.get('[data-cy="email"]').type("unknown@gmail.com");
    cy.get('[data-cy="password"]').type("123456");
    cy.get('[data-cy="loginButton"]').click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("email or password is wrong");
    });
  });

  it("should successfully login and navigate to home page", () => {
    // Fill the form
    cy.get('[data-cy="email"]').type(testUser.email);
    cy.get('[data-cy="password"]').type(testUser.password);

    // Submit the form
    cy.get('[data-cy="loginButton"]').click();

    // Navigate to login page
    cy.url().should("eq", "http://localhost:5173/");

    // Verify the browser actually redirected to the login route
    cy.url().should("include", "/");
    cy.get("header").contains("Login").should("not.exist");
  });
});
