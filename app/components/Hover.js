// Deprecated for useHover hook

// class Hover extends React.Component {
//     state = { hovering: false }
//
//     mouseOver = () => this.setState({ hovering: true })
//     mouseOut = () => this.setState({ hovering: false })
//
//     render() {
//         return (
//             <div
//                 onMouseOver={this.mouseOver}
//                 onMouseOut={this.mouseOut}
//             >
//                 {this.props.children(this.state.hovering)}
//             </div>
//         );
//     }
// }

// export default Hover


// constructor(props) {
//     super(props);
//
//     this.state = {
//         hovering: false
//     };
//
//     this.mouseOver = this.mouseOver.bind(this);
//     this.mouseOut = this.mouseOut.bind(this);
// }
//
// mouseOver () {
//     this.setState({
//         hovering: true
//     })
// }
//
// mouseOut () {
//     this.setState({
//         hovering: false
//     })
// }
