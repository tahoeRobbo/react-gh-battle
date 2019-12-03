import React from 'react'

import useHover from '../hooks/useHover'

const styles = {
    container: {
        position: 'relative',
        display: 'flex'
    },
    tooltip: {
        boxSizing: 'border-box',
        position: 'absolute',
        width: '160px',
        bottom: '100%',
        left: '50%',
        marginLeft: '-80px',
        borderRadius: '3px',
        backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
        padding: '7px',
        marginBottom: '5px',
        color: '#fff',
        textAlign: 'center',
        fontSize: '14px',
    }
}

// Tooltip with custom hook
function Tooltip ({ text, children }) {
    const [ hovering, attrs ] = useHover()

    return (
      <div style={styles.container} {...attrs}>
        {hovering === true && <div style={styles.tooltip}>{text}</div>}
        {children}
      </div>
    )
}

export default Tooltip

// Tooltip with render props pattern

// class Tooltip extends React.Component {
//     static propTypes = {
//         text: PropTypes.string.isRequired
//     }
//
//     render() {
//         const { text, children } = this.props
//
//         return (
//             <div>
//                 <Hover>
//                     {(hovering) => (
//                         <div style={styles.container}>
//                             {hovering === true && <div style={styles.tooltip}>{text}</div>}
//                             {children}
//                         </div>
//                     )}
//                 </Hover>
//             </div>
//         );
//     }
// }
//
// Tooltip.propTypes = {
//     text: PropTypes.string.isRequired
// }
//
// export default Tooltip

// Tooltip using withHover HOC pattern
// ***********************************
// import withHover from "./withHover";
//
// function Tooltip ({ text, hovering, children }) {
//     return (
//         <div style={styles.container}>
//             {hovering === true && <div style={styles.tooltip}>{text}</div>}
//             {children}
//         </div>
//     )
//
// }
//
// Tooltip.propTypes = {
//     text: PropTypes.string.isRequired,
//     hovering: PropTypes.bool.isRequired,
// }
//
// export default withHover(Tooltip)
