import React, {Component} from 'react';

export default class MyComponent2 extends React.Component {
    constructor(props){
        super(props);
        this.focusTextInput = this.focusTextInput.bind(this);
    }


    focusTextInput(e){
        console.log(e);
        this.textInput.focus();
    }

    render() {
        return (
            <div>
                <input
                    ref={(input) => {this.textInput = input}}
                />
                <input
                    type="button"
                    value="Focus the text input"
                    onClick={this.focusTextInput}
                />
            </div>
        );
    }
}
