import React from "react";
import ThreadList from "../components/ThreadList.jsx";
import { MemoryRouter } from "react-router";

const stories = {
  title: "ThreadList",
  component: ThreadList,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default stories;

const Template = (args) => <ThreadList {...args} />;

export const Default = Template.bind({});
Default.args = {
  threads: [
    {
      id: 1,
      title: "React Storybook",
      body: "Storybook is a frontend tool for building UI components and pages in isolation.",
      createdAt: "2023-01-01T00:00:00.000Z",
      category: "React",
      owner: {
        id: 1,
        name: "John Doe",
      },
      upVotesBy: [{ id: 1 }],
      downVotesBy: [],
      totalComments: 10,
    },
    {
      id: 2,
      title: "Redux Toolkit",
      body: "The official, opinionated, batteries-included toolset for efficient Redux development.",
      createdAt: "2023-01-02T00:00:00.000Z",
      category: "Redux",
      owner: {
        id: 2,
        name: "Jane Smith",
      },
      upVotesBy: [{ id: 1 }, { id: 2 }],
      downVotesBy: [],
      totalComments: 2,
    },
  ],
};
