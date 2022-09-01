import {TaskStateType} from "../AppWithReducer";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodoListAT, todoListId_1, todoListId_2} from "./todolists-reducer";

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

const initialState:TaskStateType = {
  /*  [todoListId_1]: [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/ES6", isDone: false},
    ],
    [todoListId_2]: [
        {id: v1(), title: "Bread", isDone: true},
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Meat", isDone: false},
    ],*/
}

export const tasksReducer = (state = initialState, action: ActionType): TaskStateType => {
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
