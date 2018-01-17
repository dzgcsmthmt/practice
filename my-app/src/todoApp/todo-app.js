import React, { Component } from 'react';
import TodoListCreator from './todo-list-creator';
import TodoList from './todo-list';

const todos = [
    {
        task: 'learning redux',
        isCompleted: false
    },
    {
        task: 'eat dinner',
        isCompleted: true
    }
]

export default class TodoApp extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos : todos
        }
    }

    onSubmit(task){
        var todos = this.state.todos;
        todos.push({
            task: task,
            isCompleted: false
        });
        this.setState({todos});
    }

    onEditSubmit(todo,task){
        var todos = this.state.todos;
        var index = todos.indexOf(todo);
        var todo;
        if(index > -1){
            todo = todos[index];
            todo.task = task;
        }
        this.setState({todos});
    }

    onDelete(todo){
        var todos = this.state.todos;
        var index = todos.indexOf(todo);
        if(index > -1){
            todos.splice(index,1);
        }
        this.setState({todos});
    }

    render(){
        return (
            <div className="App">
                <h1>Todo List</h1>
                <TodoListCreator onSubmit={this.onSubmit.bind(this)} todos={this.state.todos}/>
                <TodoList todos={this.state.todos}  onEditSubmit={this.onEditSubmit.bind(this)} onDelete={this.onDelete.bind(this)}/>
            </div>
        )
    }
}
