import React, {ChangeEvent, memo} from "react";
import {TaskType} from "../Todolist";
import {Checkbox, FormControlLabel, IconButton} from "@material-ui/core";
import {Delete, Favorite, FavoriteBorder} from "@material-ui/icons";
import {EditableSpan} from "../EditableSpan";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean ) => void
    changeTaskTitle: (taskID: string, title: string ) => void

}


export const Task = memo(({
                         task,
                         removeTask,
                         changeTaskTitle,
                         changeTaskStatus,

                     }: TaskPropsType) => {

    console.log('task')

    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue);
    }
    const onTitleChangeHandler = (newValue: string) => {
        changeTaskTitle(task.id, newValue);
    }


return <li key={task.id} className={task.isDone ? "isDone" : ""}>

    <FormControlLabel
        control={<Checkbox
            value="checkedA"
            onChange={onChangeHandler} checked={task.isDone}
            inputProps={{'aria-label': 'Checkbox A'}}
            icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checkedH"
        />}
        label=""
    />

    <EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
    <IconButton
        aria-label="delete"
        onClick={onClickHandler}>
        <HighlightOffIcon/>
    </IconButton>
        </li>
})
