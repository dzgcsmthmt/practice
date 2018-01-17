import {ADD_TODO,EDIT_TODO,DELETE_TODO,TOGGLE_TODO,TOGGLE_EDIT} from '../const/const';

export function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}


export function toggleEdit(payload){
    return {
        type: TOGGLE_EDIT,
        payload
    }
}


export function deleteTodo(payload){
    return {
        type: DELETE_TODO,
        payload
    }
}


export function editTodo(payload){
    return {
        type: EDIT_TODO,
        payload
    }
}


export function toggleTodo(payload){
    return {
        type: TOGGLE_TODO,
        payload
    }
}
