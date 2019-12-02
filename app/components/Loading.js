import React from 'react'
import PropTypes from 'prop-types'

const styles = {
    content: {
        fontSize: '35px',
        position: 'absolute',
        left: '0',
        right: '0',
        marginTop: '20px',
        textAlign: 'center'
    }
}

export default function Loading ({ text = 'loading', speed = 100 }) {
    console.log('loading')
    const [ content, setContent ] = React.useState(text)
    React.useEffect(() => {
        const interval = window.setInterval(() => {
            setContent((content) => {
                return content === `${text}...`
                    ? text
                    : `${content}.`
            })
        }, speed)

        return () => window.clearInterval(interval)

    }, [text, speed])

    return (
      <p style={styles.content}>
          {content}
      </p>
    )
}

Loading.propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number,
}

// export default class Loading2 extends React.Component {
//     state = { content: this.props.text }
//
//     static propTypes = {
//         text: PropTypes.string,
//         speed: PropTypes.number,
//     }
//
//     static defaultProps = {
//         text: 'Loading',
//         speed: 300
//     }
//
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         content: props.text
//     //     };
//     // }
//
//     componentDidMount() {
//         const { speed, text } = this.props
//
//         this.interval =  window.setInterval(() => {
//             this.state.content === text + '...'
//                 ? this.setState({ content: text })
//                 : this.setState(({ content }) => ({content: content + '.'}))
//         } , speed)
//     }
//
//     componentWillUnmount() {
//         window.clearInterval(this.interval)
//     }
//
//     render() {
//         return (
//             <p style={styles.content}>
//                 {this.state.content}
//             </p>
//         );
//     }
// }

// Loading.propTypes = {
//     text: PropTypes.string,
//     speed: PropTypes.number,
// }

// Loading.defaultProps = {
//     text: 'Loading',
//     speed: 300
// }
