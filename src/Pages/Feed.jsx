import React from "react";
import { Link } from "@inertiajs/react";
import MainLayout from "../components/Layouts/MainLayout";
import ThumbnailList from "../components/ThumbnailList";

const PageFeed = ({ lists }) => {
  return (
    <>
      <h1>Hello from Feed component!</h1>
      <Link href="/auth/register">Register</Link>
      <Link href="/lists/kQKMTK">Go to list</Link>
      <ThumbnailList items={lists} />
    </>
  );
};

PageFeed.layout = (page) => <MainLayout children={page} />;

export default PageFeed;
