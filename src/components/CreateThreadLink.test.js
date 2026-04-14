import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router";
import CreateThreadLink from "./CreateThreadLink.jsx";

describe('CreateThreadLink component', () => {
  it("should render the link with correct text and href attribute", () => {
    // Arrange
    render(
      <BrowserRouter>
        <CreateThreadLink />
      </BrowserRouter>
    );

    // Assert
    const linkElement = screen.getByRole("link", { name: /new thread/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/threads/new");
  });
});