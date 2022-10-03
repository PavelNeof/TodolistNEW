import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";


export type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.title);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.changeTitle(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ?
            <TextField
               value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}
            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})