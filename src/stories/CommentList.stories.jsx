import CommentList from "../components/CommentList.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import threadDetailReducer from "../states/threadDetail/reducer.js";

const mockStore = configureStore({
  reducer: {
    threadDetail: threadDetailReducer,
  },
});

const stories = {
  title: "CommentList",
  component: CommentList,
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <Story />
      </Provider>
    ),
  ],
};

export default stories;

const Template = (args) => <CommentList {...args} />;

export const Default = Template.bind({});
Default.args = {
  userId: "user-1",
  threadId: "thread-1",
  threadDetail: {
    comments: [
      {
        id: "comment-1",
        content: "This is the first comment!",
        createdAt: "2023-01-01T00:00:00.000Z",
        owner: {
          id: "user-2",
          name: "Jane Doe",
          avatar: "https://ui-avatars.com/api/?name=Jane+Doe&background=random",
        },
        upVotesBy: [],
        downVotesBy: [],
      },
      {
        id: "comment-2",
        content: "This is the second comment!",
        createdAt: "2023-01-02T00:00:00.000Z",
        owner: {
          id: "user-3",
          name: "Bob Smith",
          avatar: "https://ui-avatars.com/api/?name=Bob+Smith&background=random",
        },
        upVotesBy: ["user-1"],
        downVotesBy: [],
      },
    ],
  },
};
