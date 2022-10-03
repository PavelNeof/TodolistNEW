import React from 'react'
import './App.css'
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import {useSelector} from "react-redux";
import {TodolistsList} from "./components/TodolistsList";

import {AppRootStateType} from "./reducers/store";
import {RequestStatusType} from "./reducers/app-reducer";
import {AppBar, Button, Container, IconButton, LinearProgress, Menu, Toolbar, Typography} from "@mui/material";



// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
// import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';



function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu open/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            { status ==='loading' && <LinearProgress  /> }
            <Container fixed>
                <TodolistsList/>
            </Container>
            <ErrorSnackbar/>
        </div>
    )
}

export default App
