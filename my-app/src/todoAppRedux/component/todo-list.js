import React, {Component} from 'react';
import { connect } from 'react-redux';
import TodoListItem from './todo-list-item';

class TodoList extends Component {

    renderItems(){
        return this.props.todos.map((todo) => {
            return <TodoListItem todo={todo} key={todo.id}/>
        })
    }

    render() {
        console.log(this.props);
        return (
            <div className='table'>
                {this.renderItems()}
            </div>
        );
    }


}

function mapStateToProps(state){
    return {
        todos: state.todos
    }
}


export default connect(mapStateToProps,null)(TodoList);
