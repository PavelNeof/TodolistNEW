import React, {useEffect, useState} from 'react'

import {PropertiesTask, tasksAPI} from "../api/tasks-api";


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '8aa69dee-17e4-4d68-83b1-cf7c55b2b600'

        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '8aa69dee-17e4-4d68-83b1-cf7c55b2b600';
        const title = 'gogogogogogo'

        tasksAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '8aa69dee-17e4-4d68-83b1-cf7c55b2b600';
        const taskId = 'd02d1697-75c5-4d6e-b694-80a5075d9b2f'

        tasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '8aa69dee-17e4-4d68-83b1-cf7c55b2b600';
        const taskId = '3d397222-883b-4d81-9864-9d0375b1aa47'
        const title = '1111'
        const task: PropertiesTask = {title ,description:null,status:0,priority:1,startDate:null,deadline:null}

        tasksAPI.updateTask(todolistId, taskId , task)
            .then(res =>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

