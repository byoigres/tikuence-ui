import React from "react";
import { Link as InertiaLink, router } from '@inertiajs/react';
import MainLayout from "../../components/Layouts/MainLayout";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Details = ({ id, title, videos }) => {
  return (
    <div>
      <h1>{title}</h1>
      <Button
        startIcon={<AddCircleIcon />}
        color="primary"
        variant="text"
        size="medium"
        href={`/lists/${id}/videos/add`}
        onClick={(e) => {
          e.preventDefault();
          router.visit(`/lists/${id}/videos/add`, {
            method: 'get',
            preserveState: true,
            preserveScroll: true,
            only: ['auth', 'flash', 'errors', 'referer', 'modal'],
          });
        }}
      >
        Add video to list
      </Button>
      {videos && videos.length > 0 && (
        <Typography component="span" variant="caption">
          {`There ${videos.length > 1 ? 'are' : 'is'} ${videos.length} video${videos.length > 1 ? 's' : ''
            } in this list`}
        </Typography>
      )}
      {videos && videos.length === 0 && (
        <Typography component="h6" variant="h6" color="secondary">
          This is an empty list, the creator hasn't added any videos yet.
        </Typography>
      )}
      {videos && videos.length > 0 && videos.map((video) => (
        <h2 key={video.id}>{video.title}</h2>
      ))}
    </div>
  );
};

Details.layout = (page) => <MainLayout children={page} />;

export default Details;