
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
        console.log("Item render: ", this.props.index, this.props.numbers);
        return (
            <span>hmm {this.props.numbers[this.props.index].foo.bar}</span>
        );
    }
}
Item.propTypes = {
    numbers: React.PropTypes.array.isRequired,
    index: React.PropTypes.number.isRequired
};

Item = connect((state, componentProps) => {
    return {numbers: state};
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

