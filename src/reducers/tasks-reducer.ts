import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodoListAT} from "./todolists-reducer";

type removeTaskAT = {
    type: "REMOVE-TASK"
    taskId: string
    todolistID: string
}


type addTaskAT = ReturnType<typeof addTaskAC>

type changeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskID: string
    isDone: boolean
    todoListId: string
}

type changeTitleStatusAT = ReturnType<typeof changeTitleStatusAC>

/* ReturnType<typeof changeTaskStatusAC>*/


type ActionType = ReturnType<typeof removeTaskAC> | addTaskAT | changeTaskStatusAT | changeTitleStatusAT | AddTodolistAT | RemoveTodoListAT;


export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(el => el.id != action.taskId)
            }

        case "ADD-TASK":
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistID]: [newTask, ...state[action.todolistID]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskID ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskID ? {
                        ...t,
                        title: action.title
                    } : t
                )
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistID]:[]
            }
        case "REMOVE-TODOLIST":
            let newState = {...state}
            delete newState[action.id]
            return newState
        default:
            return state
        // throw new Error('I dont understand this type')
    }
}


export const removeTaskAC = (taskId: string, todolistID: string): removeTaskAT => {
    return {type: "REMOVE-TASK", taskId, todolistID} as const
}
export const addTaskAC = (title: string, todolistID: string) => ({type: "ADD-TASK", title, todolistID}) as const

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListId: string): changeTaskStatusAT => {
    return {type: "CHANGE-TASK-STATUS", taskID, isDone, todoListId} as const
}
export const changeTitleStatusAC = (taskID: string, title: string, todoListId: string) => {
    return {type: "CHANGE-TASK-TITLE", taskID, title, todoListId} as const
}
