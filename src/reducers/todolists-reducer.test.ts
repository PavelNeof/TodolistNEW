import {FilterValuesType, TaskStateType, TodoListType} from "../AppWithReducer";
import {
    AddTodolistAC, ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    ChangeTodoListTitleAT,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {v1} from "uuid";





let todolistId1:string;
let todolistId2:string;

let startState: Array<TodoListType>

beforeEach(()=>{
     todolistId1 = v1();
     todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})


//remove todolist
test('correct todolist should be removed', () => {
    // 1. Тестовые данные:

    // 2. Вызов тестируемой функции:
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId2))
    // 3. Сверка результата c ожиданием:
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId1);
});

//add todolist
test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

//Change TodoList Title
test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action: ChangeTodoListTitleAT = {
        type: "CHANGE-TODOLIST-TITLE" as const,
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todolistsReducer(startState, ChangeTodoListTitleAC(newTodolistTitle,todolistId2));
    //или  const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

//Change TodoList Filter
test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action = {
        type: "CHANGE-TODOLIST-FILTER" as const,
        id: todolistId2,
        filter: newFilter
    }

    const endState = todolistsReducer(startState, ChangeTodoListFilterAC(newFilter,todolistId2));
    //или const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});







