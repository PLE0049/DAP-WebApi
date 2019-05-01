import React, { Component } from 'react';

class Parent extends Component {
    constructor(props) {
        super(props);
        const child = React.createRef();
    }

    onClick = () => {
        console.log(this.child.getAlert());
    };

    render() {
        return (
            <div>
                <Child ref={child => this.child = child} />
                <button onClick={this.onClick}>Click</button>
            </div>
        );
    }
}
export default Parent;  

class Child extends Component {
    getAlert() {
        alert('getAlert from Child');
    }

    render() {
        return <h1>Hello</h1>;
    }
}


