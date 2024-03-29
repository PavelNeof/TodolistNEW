import React, {useState} from 'react'

 import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../reducers/store";
import {setErrorAC} from "../reducers/app-reducer";
import {Snackbar} from "@mui/material";



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(null))
    }

    return (
        <Snackbar open={!!error} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}