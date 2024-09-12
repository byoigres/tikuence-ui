import React from "react";
import { usePage, Link as InertiaLink, router } from '@inertiajs/react';
import MainLayout from "../../components/Layouts/MainLayout";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const View = ({ id, title }) => {
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
    </div>
  );
};

View.layout = (page) => <MainLayout children={page} />;

export default View;