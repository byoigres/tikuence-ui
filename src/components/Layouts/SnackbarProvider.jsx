import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider as NativeSnackbarProvider } from 'notistack';

const SnackBarProvider = ({ children, flash }) => {
  const notistackRef = React.createRef();

  useEffect(() => {
    if (flash) {
      let message = null;
      let variant = null;
      const timestamp = localStorage.getItem('_tklastflashtime');

      if (flash.success) {
        message = flash.success;
        variant = 'success';
      } else if (flash.info) {
        message = flash.info;
        variant = 'info';
      } else if (flash.warning) {
        message = flash.warning;
        variant = 'warning';
      } else if (flash.error) {
        message = flash.error;
        variant = 'error';
      }

      if (message && timestamp !== flash.timestamp) {
        notistackRef.current.enqueueSnackbar(message, {
          variant,
        });

        localStorage.setItem('_tklastflashtime', flash.timestamp);
      }
    }
  }, [flash]);

  return (
    <NativeSnackbarProvider
      ref={notistackRef}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      action={(key) => (
        <Button
          sx={{ color: 'white' }}
          onClick={() => {
            if (notistackRef.current) {
              notistackRef.current.closeSnackbar(key)
            }
          }}
        >
          Dismiss
        </Button>
      )}
    >
      {children}
    </NativeSnackbarProvider>
  );
};

export default SnackBarProvider;
