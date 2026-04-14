describe("Create comment", () => {
  // Create unique user
  const testUser = {
    name: "Comment Tester",
    email: `thread_tester_${Date.now()}@gmail.com`,
    password: "password123",
  };

  before("Register", () => {
    cy.request({
      method: "POST",
      url: "https://forum-api.dicoding.dev/v1/register",
      body: testUser,
    });
  });

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

      cy.request({
        method: "POST",
        url: "https://forum-api.dicoding.dev/v1/threads",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          title: `My Cypress Test Thread ${Date.now()}`,
          body: "This is a test thread.",
          category: "Testing",
        },
      }).then(() => {
        cy.visit("http://localhost:5173/");
      });
    });
  });

  it("should navigate to a thread detail, post a comment, and render it", () => {
    cy.get('[data-cy="thread-detail-link"]').first().click();

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
