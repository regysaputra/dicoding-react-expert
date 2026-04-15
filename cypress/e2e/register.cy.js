describe("Register spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/register");
  });

  it("should display register page correctly", () => {
    cy.get('[data-cy="fullName"]').should("be.visible");
    cy.get('[data-cy="email"]').should("be.visible");
    cy.get('[data-cy="password"]').should("be.visible");
    cy.get('[data-cy="confirmPassword"]').should("be.visible");
    cy.get('[data-cy="registerButton"]').should("be.visible");
  });

  it("should show alert if password below six character", () => {
    cy.get('[data-cy="fullName"]').type("John Doe");
    cy.get('[data-cy="email"]').type("john_doe@gmail.com");
    cy.get('[data-cy="password"]').type("12345");
    cy.get('[data-cy="confirmPassword"]').type("12345");
    cy.get('[data-cy="registerButton"]').click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Password must be at least 6 characters long");
    });
  });

  it("should show alert if confirm password doesn't match with password", () => {
    cy.get('[data-cy="fullName"]').type("John Doe");
    cy.get('[data-cy="email"]').type("john_doe@gmail.com");
    cy.get('[data-cy="password"]').type("123456");
    cy.get('[data-cy="confirmPassword"]').type("654321");
    cy.get('[data-cy="registerButton"]').click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Passwords do not match");
    });
  });

  it("should show alert if register with email that already registered", () => {
    // Intercept the real API call and FORCE it to fail
    cy.intercept("POST", "**/register", {
      statusCode: 400,
      body: {
        status: "fail",
        message: "email is already taken",
      },
    }).as("registerFailure");

    // Fill the form
    cy.get('[data-cy="fullName"]').type("John Doe");
    cy.get('[data-cy="email"]').type("john_doe@gmail.com");
    cy.get('[data-cy="password"]').type("123456");
    cy.get('[data-cy="confirmPassword"]').type("123456");

    // Submit the form
    cy.get('[data-cy="registerButton"]').click();

    cy.wait("@registerFailure");

    // Navigate to login page
    cy.on("window:alert", (text) => {
      expect(text).to.contains("email is already taken");
    });
  });

  it("should successfully register user and navigate to login page", () => {
    // Fill the form
    cy.get('[data-cy="fullName"]').type("John Doe");
    cy.get('[data-cy="email"]').type("johny_somalie@gmail.com");
    cy.get('[data-cy="password"]').type("123456");
    cy.get('[data-cy="confirmPassword"]').type("123456");

    // Submit the form
    cy.get('[data-cy="registerButton"]').click();

    // Navigate to login page
    cy.url().should("eq", "http://localhost:5173/login");

    // Verify the browser actually redirected to the login route
    cy.url().should("include", "/login");
  });
});
