import React from 'react'

class Hello extends React.Component {

    render() {
    let {username, authed, warn, header} = this.props
        return(
            <React.Fragment>
                {header}
                <h3>What up {username}!</h3>
                {authed ? <button onClick={warn}>say yo</button> : null}
            </React.Fragment>
        )
    }
}

export default Hello
