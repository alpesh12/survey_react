import React from "react";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const AlertBox = (props) => {
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        props.setShow(false);
    };

    return props.show ? (
        <Snackbar
            open={props.show}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert onClose={handleClose} {...props}>
                {props.message}
            </Alert>
        </Snackbar>
    ) : (
        <></>
    );
};

export default AlertBox;
