import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from "./AppWithReducer";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan, EditableSpanPropsType} from "./EditableSpan";
import {Button, Checkbox, FormControlLabel, IconButton, List} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import {Task} from "./components/Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskID: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    changeTodolistTitle: (title: string, todoListId: string) => void
}

const TodoList = memo((props: TodoListPropsType) => {

    console.log('todolist')


    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.todoListId), [props.removeTask, props.todoListId])

    const changeTaskStatus = useCallback((taskId: string, newTaskStatus: boolean) => {
        props.changeTaskStatus(taskId, newTaskStatus, props.todoListId);
    }, [props.changeTaskStatus, props.todoListId])

    const changeTaskTitle = useCallback((taskId: string, newTaskTitle: string) => {
        props.changeTaskTitle(taskId, newTaskTitle, props.todoListId);
    }, [props.changeTaskTitle, props.todoListId])

   /* let tasks = props.tasks;

    if (props.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }*/
       let tasks= props.tasks;
   switch (props.filter) {
       case "completed":
           tasks = tasks.filter(t => t.isDone === true)
           break
       case "active":
           tasks = tasks.filter(t => t.isDone === false)
           break
       default:
           tasks = tasks
   }
    const tasksListItems = props.tasks.length
        ? tasks.map(task => {

            return (
                <Task key={task.id}
                      task={task}
                      removeTask={removeTask}
                      changeTaskStatus={changeTaskStatus}
                      changeTaskTitle={changeTaskTitle}/>

                /* <li key={task.id} className={task.isDone ? "isDone" : ""}>
                     {/!*<input
                         onChange={changeTaskStatus}
                         type="checkbox" checked={task.isDone}
                     />*!/}
                     <FormControlLabel
                         control={<Checkbox
                             value="checkedA"
                             onChange={changeTaskStatus} checked={task.isDone}
                             inputProps={{'aria-label': 'Checkbox A'}}
                             icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checkedH"
                         />}
                         label=""
                     />

                     {/!*<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />*!/}

                     {/!*<button onClick={removeTask}>x</button>*!/}

                     <EditableSpan title={task.title} changeTitle={onChangeTitleHandler}/>
                     <IconButton
                         aria-label="delete"
                         onClick={removeTask}>
                         <HighlightOffIcon/>
                     </IconButton>
                 </li>*/
            )
        })
        : <span>Your taskList is empty</span>


    const removeTodoList = () => {
        props.removeTodoList(props.todoListId)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId]);
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todoListId)
    }

    const btnColor = {color: "#78909c"};

    const getChangeFilterHandler = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter, props.todoListId)
    }

/*    const onAllClickHandler = () => props.changeFilter("all", props.todoListId);
    const onActiveClickHandler = () => props.changeFilter("active", props.todoListId);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todoListId);*/


    return (


        <div>

            <h3><EditableSpan title={props.title}
                              changeTitle={changeTodolistTitle}/>
                {/* <button onClick={removeTodoList}>x</button>*/}
                <IconButton aria-label="delete"
                            style={btnColor}
                            onClick={removeTodoList}>
                    <DeleteIcon/>
                </IconButton>


            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksListItems}
            </List>
            <div>
                <Button
                    size={'small'}
                    variant={'contained'}

                    color={props.filter === "all" ? "secondary" : "primary"}
                    /*className={props.filter === "all" ? "active" : ""}*/
                    onClick={getChangeFilterHandler("all")}>All
                </Button>
                <Button
                    style={{marginLeft: "2px"}}

                    size={'small'}
                    variant={'contained'}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    /*className={props.filter === "active" ? "active" : ""}*/
                    onClick={getChangeFilterHandler("active")}>Active
                </Button>
                <Button
                    style={{marginLeft: "2px"}}
                    size={'small'}
                    variant={'contained'}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    /*className={props.filter === "completed" ? "active" : ""}*/
                    onClick={getChangeFilterHandler("completed")}>Completed
                </Button>
            </div>
        </div>
    );
});

export default TodoList;