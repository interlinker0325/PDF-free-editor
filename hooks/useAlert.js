import {enqueueSnackbar} from "notistack";

const defaultOptions = {
  preventDuplicate: true,
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center'
  }
}

export default function useAlert() {

  function showSuccess(message, options = null) {
    return enqueueSnackbar(message,
        {
          variant: 'success',
          ...defaultOptions,
          ...options
        });
  }

  function showError(message, options = null) {
    return enqueueSnackbar(message,
        {
          variant: 'error',
          ...defaultOptions,
          ...options
        });
  }

  function showWarning(message, options = null) {
    return enqueueSnackbar(message,
        {
          variant: 'warning',
          ...defaultOptions,
          ...options
        });
  }

  return {showSuccess, showError, showWarning};
}