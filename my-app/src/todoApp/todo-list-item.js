import React, {Component} from 'react';

export default class TodoListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            isCompleted: props.todo.isCompleted,
            isEditing: false
        }
    }

    toggleCompleteStatus(e){
        this.setState((prevState) => {
            return {isCompleted: !prevState.isCompleted};
        });
    }

    toggleEditStatus(e){
        this.setState((prevState) => {
            return {isEditing: !prevState.isEditing};
        });
    }

    onEditSubmit(flag,e){
        typeof flag == 'boolean' && e.preventDefault();
        this.props.onEditSubmit(this.props.todo,this.refs.editInput.value);
    }

    onDelete(e){
        this.props.onDelete(this.props.todo);
    }

    renderTask(){
        if(!this.state.isEditing){
            return (
                <div
                    className="td"
                    style={{color: this.state.isCompleted ? 'green' : 'red',cursor: 'pointer'}}
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
        if(!this.state.isEditing){
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

    render() {
        return (
            <div >
                {this.renderTask()}
                {this.renderBtns()}
            </div>
        );
    }
}
