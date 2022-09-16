import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}



export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'newTODO'
        todolistAPI.createTodolist(title)
            .then(res=>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '3bf29cf5-57a1-46c2-9ef2-99fa297a1dd1';
        todolistAPI.deleteTodolist(todolistId)
            .then( (res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a91178cc-5418-462b-8c02-3dcd55a65f14';
        const title = '1111'
        todolistAPI.updateTodolist(todolistId,title )
            .then(res =>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

