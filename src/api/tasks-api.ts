import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'adde9436-0db1-4615-b59e-fd954f05d11c'
    }
})
type GetTaskResponse = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type ResponseType<D={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type PropertiesTask = {
    title: string
    description: string | null
    //completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
   updateTask(todolistId: string, taskId: string, data:PropertiesTask) {
       return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, data)
   }
}