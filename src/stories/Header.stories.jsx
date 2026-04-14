import Header from "../components/Header.jsx";
import { MemoryRouter } from "react-router";

const stories = {
  title: "Header",
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default stories;

const Template = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  authUser: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
  },
  onLogout: () => alert("logout clicked"),
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  authUser: null,
  onLogout: () => {},
};
