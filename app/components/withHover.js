import React from 'react'

export default function withHover (Component, propName = 'hovering') {
    return class WithHover extends React.Component {
        state = {
            [propName]: false
        }

        mouseOver = () => this.setState({ [propName]: true })
        mouseOut = () => this.setState({ [propName]: false })

        render() {
            const props = {
                [propName]: this.state.hovering,
                ...this.props
            }

            return (
                <div
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                >
                   <Component {...props} />
                </div>
            );
        }
    }
}
