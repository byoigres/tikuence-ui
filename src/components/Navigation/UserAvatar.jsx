import React from 'react';
import Avatar from "@mui/material/Avatar";
import { usePage } from '@inertiajs/react';

const UserAvatar = () => {
  const {
    props: {
      auth: {
        isAuthenticated,
        profile: {
          name: [letter],
          picture
        },
      },
    },
  } = usePage();

  return (
    isAuthenticated ? (
      <Avatar src={picture}>
        {letter.toUpperCase()}
      </Avatar >
    ) : (
      <AccountCircleIcon fontSize="large" />
    )
  );
};

export default UserAvatar;
