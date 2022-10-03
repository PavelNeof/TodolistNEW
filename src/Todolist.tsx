import React, {ChangeEvent, memo, useCallback, useEffect} from 'react';
import {FilterValuesType} from "./AppWithReducer";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan, EditableSpanPropsType} from "./EditableSpan";

import {Task} from "./components/Task";
import {TaskStatuses} from "./api/Types-api";
import {RequestStatusType} from "./reducers/app-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./reducers/tasks-reducer";
import {TaskType} from "./api/todolist-api";
import {Button, IconButton, List} from "@mui/material";

// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    entityStatus:RequestStatusType
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType

}

const TodoList = memo((props: TodoListPropsType) => {


    const dispatch = useDispatch()
    useEffect(() => {
        const thunk = fetchTasksTC(props.id)
        // @ts-ignore ПОМЕТКА
        dispatch(thunk)
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.id, props.changeFilter])


    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    const btnColor = {color: "#78909c"};


    return (


        <div>

            <h3><EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                {/* <button onClick={removeTodoList}>x</button>*/}
                <IconButton aria-label="delete"
                            style={btnColor}
                            onClick={removeTodolist}
                            disabled={props.entityStatus==='loading'}>
                  {/*  <DeleteIcon/>*/}
                </IconButton>


            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {
                    tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.id}
                                                    removeTask={props.removeTask}
                                                    changeTaskTitle={props.changeTaskTitle}
                                                    changeTaskStatus={props.changeTaskStatus}
                    />)
                }
            </List>
            <div>
                <Button
                    size={'small'}
                    variant={'contained'}

                    color={props.filter === "all" ? "secondary" : "primary"}
                    /*className={props.filter === "all" ? "active" : ""}*/
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    style={{marginLeft: "2px"}}

                    size={'small'}
                    variant={'contained'}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    /*className={props.filter === "active" ? "active" : ""}*/
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    style={{marginLeft: "2px"}}
                    size={'small'}
                    variant={'contained'}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    /*className={props.filter === "completed" ? "active" : ""}*/
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
});

export default TodoList;