import React from "react";
import Footer from "../components/Footer.jsx";

const stories = {
  title: "Footer",
  component: Footer,
};

export default stories;

const Template = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {};
