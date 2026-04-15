import React from "react";
import CreateThreadLink from "../components/CreateThreadLink.jsx";
import { MemoryRouter } from "react-router";

const stories = {
  title: "CreateThreadLink",
  component: CreateThreadLink,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default stories;

const Template = (args) => <CreateThreadLink {...args} />;

export const Default = Template.bind({});
Default.args = {};
