import React from 'react'
import ReactDOM from 'react-dom'

import Hello from "./components";
import Popular from "./components/Popular";
import Battle from "./components/Battle";

import './index.css'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <h1 >to all my shnizzies</h1>
                <Battle />
                {/*<Popular />*/}
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
