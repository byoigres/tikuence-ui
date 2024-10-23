import React, { useState } from "react";
import { usePage, Link as InertiaLink, router } from '@inertiajs/react';
import MainLayout from "../../components/Layouts/MainLayout";
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TikTokVideoPlayer from "../../components/TikTokVideoPlayer";

const View = () => {
  const {
    props: {
      modal
    }
  } = usePage();
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog
      open={isOpen}
      fullScreen={false}
      fullWidth
      closeAfterTransition
    >
      Hello
      <pre>
        {/* {JSON.stringify(modal, null, 2)} */}
      </pre>
      <InertiaLink href={`/lists/${modal.list.id}/details`}>Add video to list</InertiaLink>
      {modal.videos.map((video) => (
        <TikTokVideoPlayer
          tiktokId={video.tiktok_id}
        />
      ))}
    </Dialog>
  );
};

View.layout = (page) => <MainLayout children={page} />;

export default View;