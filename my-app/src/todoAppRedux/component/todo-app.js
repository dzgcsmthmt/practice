import React, { Component } from 'react';
import TodoListCreator from './todo-list-creator';
import TodoList from './todo-list';
import FilterTodo from './filter-todo';

export default class TodoApp extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="App">
                <h1>Todo List</h1>
                <TodoListCreator />
                <TodoList/>
                <FilterTodo />
            </div>
        )
    }
}
