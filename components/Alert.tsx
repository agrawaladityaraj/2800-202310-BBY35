import { useContext } from "react";
import { Snackbar, Alert } from "@mui/material";

import Context from "@/Context/Context";

const SystemAlert = () => {
  const { alert, setAlert } = useContext(Context);

  const handleClose = () => {
    setAlert({
      open: false,
      payload: "",
      severity: "",
    });
  };

  return (
    <Snackbar
      open={alert.open ?? false}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        sx={{ width: "100%" }}
        onClose={handleClose}
        severity={
          alert.severity === "error" ||
          alert.severity === "warning" ||
          alert.severity === "info" ||
          alert.severity === "success"
            ? alert.severity
            : undefined
        }
      >
        {alert.payload.toString()}
      </Alert>
    </Snackbar>
  );
};

export default SystemAlert;
