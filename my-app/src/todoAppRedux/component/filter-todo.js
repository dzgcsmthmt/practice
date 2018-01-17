import React, { Component } from 'react';
import { connect } from 'react-redux';
import {showAll,showCompleted,showActive} from '../actions/filter';

class FilterTodo extends Component {

    filterShow(type){
        if(type == 0){
            this.props.showAll({showType: 0});
        }else if(type == 1){
            this.props.showCompleted({showType: 1});
        }else if(type == 2){
            this.props.showActive({showType: 2});
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.filterShow.bind(this,0)}>Show All</button>
                <button onClick={this.filterShow.bind(this,1)}>Completed</button>
                <button onClick={this.filterShow.bind(this,2)}>Active</button>
            </div>
        );
    }
}


export default connect(null,{showAll,showCompleted,showActive})(FilterTodo);
