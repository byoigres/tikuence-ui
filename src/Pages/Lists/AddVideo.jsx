import React, { useState } from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { router, usePage, useForm } from "@inertiajs/react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddVideo = () => {
  const {
    props: {
      modal: {
        listId,
      }
    }
  } = usePage();
  const [isOpen, setIsOpen] = useState(true);
  const { data, setData, post, processing, errors } = useForm({
    videoUrl: '',
  });

  console.log({ processing })

  const handleClose = () => {
    setIsOpen(false);
  };

  function handleVideoURLChange(e) {
    setData((v) => ({
      ...v,
      [e.target.name]: e.target.value,
    }));
  }

  const handleCreate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    post(`/lists/${listId}/videos`, {
      preserveState: true,
      only: ['flash', 'errors'],
    });
  };

  return (
    <Dialog
      open={isOpen}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      onTransitionExited={() => {
        if (!isOpen) {
          router.visit('/');
        }
      }}
      closeAfterTransition
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Add video to list
          </Typography>
          <Button autoFocus color="inherit" onClick={handleCreate}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <TextField
          name="videoUrl"
          placeholder="Enter the URL of the video"
          label="Video URL"
          autoFocus
          fullWidth
          variant="standard"
          inputProps={{
            maxLength: 150,
          }}
          type="url"
          onChange={handleVideoURLChange}
          disabled={processing}
          value={data.videoUrl}
          error={!!errors.videoUrl}
          helperText={errors.videoUrl}
        />
        <DialogContentText>
          <Typography variant="caption">Paste a TikTok video URL</Typography>
        </DialogContentText>      
        <Typography variant="subtitle2" component="span">Supported URLs:</Typography>
        <Typography
          variant="subtitle2"
          component="ul"
          sx={{
            paddingLeft: 2,
          }}
        >
          <li>https://www.tiktok.com/[user]/video/[video-id]</li>
          <li>https://m.tiktok.com/v/[video-id].html</li>
          <li>https://vm.tiktok.com/[video-id]</li>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default AddVideo;
