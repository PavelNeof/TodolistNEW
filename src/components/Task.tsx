import React, {ChangeEvent, memo, useCallback} from "react";


import {EditableSpan} from "../EditableSpan";

import {TaskStatuses} from "../api/Types-api";
import {TaskType} from "../api/todolist-api";
import {Checkbox, FormControlLabel, IconButton} from "@mui/material";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);


return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>

    <FormControlLabel
        control={<Checkbox
            value="checkedA"
            onChange={onChangeHandler}
            checked={props.task.status === TaskStatuses.Completed}
            inputProps={{'aria-label': 'Checkbox A'}}
           /* icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} */
            name="checkedH"
        />}
        label=""
    />

    <EditableSpan title={props.task.title} changeTitle={onTitleChangeHandler}/>
    <IconButton
        aria-label="delete"
        onClick={onClickHandler}>
      {/*  <HighlightOffIcon/>*/}
    </IconButton>
        </div>
})
