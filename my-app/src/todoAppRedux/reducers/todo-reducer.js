import {ADD_TODO,EDIT_TODO,DELETE_TODO,TOGGLE_TODO,TOGGLE_EDIT} from '../const/const';
let id = 2;
const todoLists = [
    {
        id: 0,
        task: 'learning redux',
        isCompleted: false,
        isEditing: false
    },
    {
        id: 1,
        task: 'eat dinner',
        isCompleted: true,
        isEditing: false
    }
]

function todos(state = todoLists, action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    id: id++,
                    task: action.text,
                    isCompleted: false,
                    isEditing: false
                }
            ]
        case TOGGLE_EDIT:
            return state.map((todo) => {
                if(todo.id == action.payload.id){
                    todo.isEditing = action.payload.isEditing;
                }
                return todo;
            })
        case DELETE_TODO:
            return state.filter(todo => todo.id != action.payload.id);
        case TOGGLE_TODO:
            return state.map((todo) => {
                if(todo.id == action.payload.id){
                    todo.isCompleted = action.payload.isCompleted;
                }
                return todo;
            })
        case EDIT_TODO:
            return state.map((todo) => {
                if(todo.id == action.payload.id){
                    todo.task = action.payload.task;
                    todo.isEditing = action.payload.isEditing;
                }
                return todo;
            })
        default:
            return state
    }
}

export default todos;
