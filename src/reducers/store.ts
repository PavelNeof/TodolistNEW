import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {Action, applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux';
import {appReducer} from "./app-reducer";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {useDispatch} from "react-redux";

/*
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
*/


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, /*composeEnhancers(),*/applyMiddleware(thunkMiddleware));

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppRootStateType, unknown, Action>>()

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;