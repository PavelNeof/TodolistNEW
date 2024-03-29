// import React, {useCallback, useReducer, useState} from 'react';
// import './App.css';
// import TodoList, {TaskType} from "./Todolist";
// import {v1} from "uuid";
// import {AddItemForm} from "./components/AddItemForm";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
// import {
//     addTodolistAC,
//     ChangeTodoListFilterAC,
//     ChangeTodoListTitleAC,
//     RemoveTodolistAC,
//     todolistsReducer
// } from "./reducers/todolists-reducer";
// import {addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";
// import {useDispatch, useSelector} from "react-redux";
// import {AppRootStateType} from "./reducers/store";
// import {RequestStatusType} from "./reducers/app-reducer";
// // CRUD => СRUD
// // GUI & CLI
// export type FilterValuesType = "all" | "active" | "completed"
//
// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
//
// export type TaskStateType = {
//     [todoListId: string]: Array<TaskType>
// }
//
//
// function AppWithRedux() {
//
//
//     const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
//     let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
//     let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
//
//     const dispatch=useDispatch()
//
// // tasks:
//     const removeTask = useCallback((taskID: string, todoListId: string): void => {
//         /*const todoListTask = tasks[todoListId]
//         const updateTask = todoListTask.filter((task: TaskType) => task.id !== taskID)
//         const copyTask = {...tasks}
//         copyTask[todoListId] = updateTask
//         /!*updateTask = copyTask[todoListId]*!/
//         setTasks(copyTask)*/
//
//         // длинный вариант
//         /* setTasks( {...tasks, [todoListId]: tasks[todoListId].filter((task: TaskType) => task.id !== taskID)})*/
//
//         /*setTasks(tasks.filter((task: TaskType) => task.id !== taskID))*/
//
//         const action = removeTaskAC(taskID, todoListId)
//         /*dispatchToTasks(action)*/
//         dispatch(action)
//     },[dispatch])
//     const addTask = useCallback((title: string, todoListId: string) => {
//         /* const todoListTasks = tasks[todoListId]
//          const updateTask = [{id: v1(), title, isDone: false}, ...todoListTasks]
//          const copyTasks = {...tasks}
//          copyTasks[todoListId] = updateTask
//          setTasks(copyTasks)
//
//
//          setTasks({...tasks, [todoListId]: [{id: v1(), title, isDone: false}, ...tasks[todoListId]]})*/
//
//         dispatch(addTaskAC(title, todoListId))
//
//     },[dispatch])
//     const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListId: string) => {  // 3, false
//
//         /*     setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskID ? {...t, isDone} : t)})
//
//              // setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} :t))
//          }
//          const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {  // 3, false
//
//              setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskID ? {...t, title: title} : t)})
//      */
//         // setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} :t))
//
//         dispatch(changeTaskStatusAC(taskID, isDone, todoListId))
//
//     },[dispatch])
//     const changeTaskTitle = useCallback((taskID: string, title: string, todoListId: string) => {
//         dispatch(changeTitleStatusAC(taskID, title, todoListId))
//     },[dispatch])
//
// //todoLists:
//     const changeFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
//         /* setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter} : tl))*/
//         dispatch(ChangeTodoListFilterAC(filter, todoListId))
//         // setFilter(filter)
//     },[dispatch])
//     const changeTodolistTitle = useCallback((title: string, todoListId: string) => {
//         /* setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl))*/
//         dispatch(ChangeTodoListTitleAC(title, todoListId))
//         // setFilter(filter)
//     },[dispatch])
//     const removeTodolists =  useCallback((todoListId: string) => {
//         /*  setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
//           delete tasks[todoListId]*/
//         let action = RemoveTodolistAC(todoListId)
//         dispatch(action)
//
//
//     },[dispatch])
//     const addTodolist = useCallback((title: string) => {
//         /*   const newTodolistId = v1();
//            const newTodolist: TodoListType = {
//                id: newTodolistId,
//                title: title,
//                filter: 'all'
//            }
//            setTodoLists([...todoLists, newTodolist])
//            setTasks({...tasks, [newTodolistId]: []})*/
//         let action = AddTodolistAC(title)
//         dispatch(action)
//
//     },[dispatch])
//
//
//     // UI:
//
//     const todoListComponents = todoLists.map(tl => {
//
//
//
//         return (
//             <Grid item key={tl.id}>
//                 <Paper style={{padding: "20px"}}
//                        elevation={5}>
//                     <TodoList
//                         key={tl.id}
//                         todoListId={tl.id}
//                         title={tl.title}
//                         filter={tl.filter}
//                         tasks={tasks[tl.id]}
//
//                         addTask={addTask}
//                         removeTask={removeTask}
//                         removeTodoList={removeTodolists}
//                         changeFilter={changeFilter}
//                         changeTaskStatus={changeTaskStatus}
//                         changeTaskTitle={changeTaskTitle}
//                         changeTodolistTitle={changeTodolistTitle}
//                     />
//                 </Paper>
//             </Grid>
//         )
//     })
//
//     //
//     return (
//         <div className="App">
//             <AppBar position="static">
//
//                 <Toolbar style={{justifyContent: "space-between"}}>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         Todolists
//                     </Typography>
//                     <Button color="inherit" variant={"outlined"}>Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{paddingTop: "6px"}}>
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={2}>
//                     {todoListComponents}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default AppWithRedux;

export const aaaaa = 1;