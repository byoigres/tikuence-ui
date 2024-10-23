import React from "react";
import { Link } from "@inertiajs/react";
import MainLayout from "../components/Layouts/MainLayout";

const PageFeed = ({ lists }) => {

  return (
    <>
      <h1>Hello from Feed component!</h1>
      {/* <pre>
        <code>{JSON.stringify(lists, null, 2)}</code>
      </pre> */}
      <Link href="/auth/register">Register</Link>
      <Link href="/lists/kQKMTK">Go to list</Link>
      {lists.map((list) => (
        <div key={list.id}>
          <h2>{list.title}</h2>
          <Link href={`/lists/${list.id}/details`}>View list</Link>
        </div>
      ))}
    </>
  );
};

PageFeed.layout = (page) => <MainLayout children={page} />;

export default PageFeed;
