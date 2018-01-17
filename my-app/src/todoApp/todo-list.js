import React, {Component} from 'react';
import TodoListItem from './todo-list-item';

export default class TodoList extends Component {

    renderItems(){
        return this.props.todos.map((todo) => {
            return <TodoListItem todo={todo} key={todo.task} onEditSubmit={this.props.onEditSubmit} onDelete={this.props.onDelete}/>
        })
    }

    render() {
        return (
            <div className='table'>{this.renderItems()}</div>
        );
    }
}
