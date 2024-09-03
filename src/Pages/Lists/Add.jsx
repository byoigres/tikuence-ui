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
import MultiSelect from "../../components/MultiSelect";
import { router, usePage } from "@inertiajs/react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Add = () => {
  const {
    props: {
      modal: {
        categories,
        languages
      }
    }
  } = usePage();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
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
            Add new list
          </Typography>
          <Button autoFocus color="inherit">
            save
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <TextField
          placeholder="Enter the name of the list"
          label="List name"
          autoFocus
          fullWidth
          variant="standard"
          inputProps={{
            maxLength: 150,
          }}
        />
        <DialogContentText>
          <Typography variant="caption">Choose a useful name for the list</Typography>
        </DialogContentText>
        <MultiSelect
          label="Categories"
          placeholder="Type a category name"
          maxSelected={3}
          options={categories}
          labelPropertyName="description"
        />
        <DialogContentText>
          <Typography variant="caption">
            Categories help us to organize the content on the site
          </Typography>
        </DialogContentText>
        <MultiSelect
          label="Languages (optional)"
          placeholder="Type a language name"
          maxSelected={2}
          options={languages}
          labelPropertyName="name"
        />
        <DialogContentText>
          <Typography variant="caption">
            If the videos have audio in a language or subtitles help us by selecting both
            languages.
          </Typography>
        </DialogContentText>
        <DialogContentText>
          <Typography variant="overline">
            After creating the list you would be able to add videos to it.
          </Typography>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default Add;
