
import React from "react";
import {createStore} from "redux";
import {Provider, connect} from "react-redux";


function add() {
    return {type: "ADD"};
}

function remove() {
    return {type: "REMOVE"};
}

function reducer(state=[], action) {
    switch (action.type) {
        case "ADD":
            return state.concat({foo: {bar: Math.random()}});
        case "REMOVE":
            state = state.slice(0, -1);
            console.log("REMOVE: state length is now " + state.length);
            return state;
        default:
            return state;
    }
}

class Item extends React.Component {
    render() {
        console.log("Item render: " + this.props.value);
        return (
            <span>{this.props.value}</span>
        );
    }
}
Item.propTypes = {
    value: React.PropTypes.number.isRequired
};

Item = connect((state, props) => {
    console.log("Selecting index " + props.index, state[props.index]);
    return {value: state[props.index].foo.bar}
})(Item);

class App extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.add} >add</button>
                <button onClick={this.props.remove} >remove</button>
                <ul>
                    {this.props.items.map((v, i) => <li key={i}><Item index={i} /></li>)}
                </ul>
            </div>
        );
    }
}
App = connect(state => {
    return {items: state};
}, {add, remove})(App);

const store = createStore(reducer);

React.render(
    <div>
        <Provider store={store}>
            {() => <App />}
        </Provider>
    </div>
, document.getElementById("app"));

