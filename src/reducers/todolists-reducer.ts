import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistID:string
}

export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

type ActionType = RemoveTodoListAT | AddTodolistAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT


export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
         /*   const newTodoListID: string = v1();*/
            const newTodoList: TodoListType = {
                id: action.todolistID,
                title: action.title,
                filter: 'all'
            }
            return [...todolists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todolists
    }
}


export const RemoveTodolistAC = (id:string):RemoveTodoListAT => ({type: "REMOVE-TODOLIST", id})
export const AddTodolistAC = (title:string):AddTodolistAT => ({type: "ADD-TODOLIST", title, todolistID: v1()})
export const ChangeTodoListTitleAC = (title:string, id:string):ChangeTodoListTitleAT => ({type: "CHANGE-TODOLIST-TITLE", title, id})
export const ChangeTodoListFilterAC = (filter:FilterValuesType, id:string):ChangeTodoListFilterAT => ({type: "CHANGE-TODOLIST-FILTER", filter, id})

