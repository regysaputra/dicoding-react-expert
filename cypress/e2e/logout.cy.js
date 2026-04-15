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
    cy.request({
      method: "POST",
      url: "https://forum-api.dicoding.dev/v1/login",
      headers: {
        "Origin": "http://localhost:5173",
        "Referer": "http://localhost:5173/"
      },
      body: {
        email: testUser.email,
        password: testUser.password
      }
    }).then((response) => {
      const { token } = response.body.data;
      window.localStorage.setItem("accessToken", token);
      cy.visit("http://localhost:5173/");
    });
  });

  it("should logout successfully", () => {
    // Open user dropdown
    cy.get('[data-cy="avatar-button"]').click();

    // Click the logout button
    cy.get('[data-cy="logout-button"]').click();

    // Verify if the url is redirected to the login page
    cy.url().should("include", "/login");

    // Verify the token is removed from local storage
    cy.window().then((window) => {
      expect(window.localStorage.getItem("accessToken")).to.not.be.ok;
    });
  });
});
