import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toggleEdit,deleteTodo,editTodo,toggleTodo} from '../actions/action';

class TodoListItem extends Component {
    constructor(props){
        super(props);
    }

    renderItem(){
        let {showType} = this.props.filter;
        if(showType == 0 || (showType == 1 && this.props.todo.isCompleted) || (showType == 2 && !this.props.todo.isCompleted)){
            return (
                <div >
                    {this.renderTask()}
                    {this.renderBtns()}
                </div>
            )
        }else{
            return null;
        }
    }

    renderTask(){
        if(!this.props.todo.isEditing){
            return (
                <div
                    className="td"
                    style={{color: this.props.todo.isCompleted ? 'green' : 'red',cursor: 'pointer'}}
                    onClick={this.toggleCompleteStatus.bind(this)}
                >
                    {this.props.todo.task}
                </div>
            )
        }
        return (
            <div className="td">
                <form onSubmit={this.onEditSubmit.bind(this,true)}>
                    <input defaultValue={this.props.todo.task} ref="editInput"/>
                </form>
            </div>
        )
    }

    renderBtns(){
        if(!this.props.todo.isEditing){
            return (
                <div className="td">
                    <button onClick={this.toggleEditStatus.bind(this)}>Edit</button>
                    <button onClick={this.onDelete.bind(this)}>Delete</button>
                </div>
            )
        }
        return (
            <div className="td">
                <button onClick={this.onEditSubmit.bind(this)}>save</button>
                <button onClick={this.toggleEditStatus.bind(this)}>Cancel</button>
            </div>
        )
    }

    toggleEditStatus(){
        this.props.toggleEdit({id: this.props.todo.id,isEditing: !this.props.todo.isEditing});
    }

    onDelete(){
        this.props.deleteTodo({id: this.props.todo.id});
    }

    onEditSubmit(e,ev){
        e === true && ev.preventDefault();
        this.props.editTodo({id: this.props.todo.id,task: this.refs.editInput.value,isEditing:false});
    }

    toggleCompleteStatus(){
        this.props.toggleTodo({id: this.props.todo.id,isCompleted: !this.props.todo.isCompleted});
    }

    render() {
        return (
            <div>
                {this.renderItem()}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        todos: state.todos,
        filter: state.filter
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({toggleEdit,deleteTodo,editTodo,toggleTodo},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoListItem);
