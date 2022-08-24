import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {blueGrey, pink} from "@material-ui/core/colors";
import AppWithReducer from "./AppWithReducer";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./reducers/store";



const thame = createTheme({
    palette: {
        type:"dark",
        primary: {main:"#f06292"},
        secondary: blueGrey
    }
})

ReactDOM.render(
    <ThemeProvider theme={thame}>
        <CssBaseline/>
<Provider store={store}>
    <AppWithRedux />
</Provider>
    </ThemeProvider>,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
