import React, {Component} from 'react';

export default class TodoListCreator extends Component {
    constructor(props){
        super(props);
        this.state = {
            errorMsg: ''
        }
    }

    onSubmit(e){
        var errorMsg = '',temp;
        var val = this.refs.Textinput.value;
        e.preventDefault();
        if(!val){
            errorMsg = 'please enter a task';
            this.setState({errorMsg});
            return;
        }else{
            temp = this.props.todos.filter(todo => todo.task == val);
            if(temp.length){
                errorMsg = 'task already exists';
                this.setState({errorMsg});
                return;
            }
        }
        this.props.onSubmit(val);
        this.setState({errorMsg: ''});
        this.refs.Textinput.value = '';
    }

    render() {
        return (
            <div className="creator">
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" placeholder="what do i need to do" ref="Textinput" />
                    <button>Create</button>
                </form>
                <div className="errorMsg">{this.state.errorMsg}</div>
            </div>
        );
    }
}
