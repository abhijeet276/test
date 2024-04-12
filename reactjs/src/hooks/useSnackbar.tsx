import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface UseSnackbarOptions {
  autoHideDuration?: number;
}

interface SnackbarOptions {
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useSnackbar = (options?: UseSnackbarOptions) => {
  const [open, setOpen] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState<SnackbarOptions>({
    message: '',
    severity: 'info',
  });

  const handleClose = () => {
    setOpen(false);
  };

  const showSnackbar = (message: string, severity?: 'error' | 'warning' | 'info' | 'success') => {
    setSnackbarOptions({ message, severity: severity ?? 'info' });
    setOpen(true);
  };

  return {
    showSnackbar,
    SnackbarComponent: (
      <Snackbar
        open={open}
        autoHideDuration={options?.autoHideDuration ?? 6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbarOptions.severity}>
          {snackbarOptions.message}
        </Alert>
      </Snackbar>
    ),
  };
};

export default useSnackbar;