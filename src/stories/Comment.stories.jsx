import Comment from "../components/Comment.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import threadDetailReducer from "../states/threadDetail/reducer.js";

const mockStore = configureStore({
  reducer: {
    threadDetail: threadDetailReducer,
  },
});

const stories = {
  title: "Comment",
  component: Comment,
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <Story />
      </Provider>
    ),
  ],
};

export default stories;

const Template = (args) => <Comment {...args} />;

export const Default = Template.bind({});
Default.args = {
  userId: "user-1",
  threadId: "thread-1",
  comment: {
    id: "comment-1",
    content: "This is a great comment!",
    createdAt: "2023-01-01T00:00:00.000Z",
    owner: {
      id: "user-2",
      name: "Jane Doe",
      avatar: "https://ui-avatars.com/api/?name=Jane+Doe&background=random",
    },
    upVotesBy: ["user-3"],
    downVotesBy: [],
  },
};

export const Upvoted = Template.bind({});
Upvoted.args = {
  ...Default.args,
  comment: {
    ...Default.args.comment,
    upVotesBy: ["user-1", "user-3"],
  },
};
