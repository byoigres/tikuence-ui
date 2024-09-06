import React from "react";
import MainLayout from "../../components/Layouts/MainLayout";

const View = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

View.layout = (page) => <MainLayout children={page} />;

export default View;