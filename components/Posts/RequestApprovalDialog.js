import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export default  function RequestApprovalDialog({open, setOpen, requestApproval}) {
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirmación</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Una vez enviado a publicación, no podrás modificarlo, pero una vez aprobado, podrás solicitar
          modificaciones vía correo electrónico a info@adlyceum.com. Deseas continuar?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          setOpen(false);
        }} color="primary">
          No
        </Button>
        <Button onClick={requestApproval} color="primary" autoFocus>
          Si
        </Button>
      </DialogActions>
    </Dialog>  )
}
