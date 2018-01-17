import React, {Component} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './todoAppRedux/reducers'
import TodoApp from './todoAppRedux/component/todo-app';
import './App.css';

let store = createStore(reducers)

class App extends Component {

    render() {
        console.log(store.getState());
        return (
            <Provider store={store}>
                <TodoApp />
            </Provider>
        );
    }
}

export default App;
