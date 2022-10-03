import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import AppWithReducer from "./AppWithReducer";
import App from "./App";
import {Provider} from "react-redux";
import {store} from "./reducers/store";
import {blueGrey} from "@mui/material/colors";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";


const thame = createTheme({
    palette: {
       // type: "dark",
        primary: {main: "#f06292"},
        secondary: blueGrey
    }
})

ReactDOM.render(
    <ThemeProvider theme={thame}>
        <CssBaseline/>
        <Provider store={store}>
            <App/>
        </Provider>
    </ThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
