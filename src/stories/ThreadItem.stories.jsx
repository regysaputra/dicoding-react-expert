import React from "react";
import ThreadItem from "../components/ThreadItem.jsx";
import { MemoryRouter } from "react-router";

const stories = {
  title: "ThreadItem",
  component: ThreadItem,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default stories;

const Template = (args) => <ThreadItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  thread: {
    id: 1,
    title: "Thread Title",
    body: "This is the body of the thread. It can be quite long and should be truncated in the list view.",
    createdAt: "2023-01-01T00:00:00.000Z",
    category: "React",
    owner: {
      id: 1,
      name: "John Doe",
    },
    upVotesBy: [{ id: 1 }, { id: 2 }],
    downVotesBy: [{ id: 3 }],
    totalComments: 5,
  },
};
