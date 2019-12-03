import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import Results from "./Results";
import ThemeContext from '../contexts/Theme'

import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from "react-icons/fa";

function Instructions () {
    const { theme } = React.useContext(ThemeContext)

    return (
        <div className='instructions-container'>
            <h1 className='center-text header-lg'>
                Instructions
            </h1>
            <ol className='container-sm grid center-text battle-instructions'>
                <li>
                    <h3 className='header-sm'>Enter two Github users</h3>
                    <FaUserFriends className={`bg-${theme}`} color='rgb(255, 191, 116' size={140} />
                </li>
                <li>
                    <h3 className='header-sm'>Battle</h3>
                    <FaFighterJet className={`bg-${theme}`} color='#727272' size={140} />
                </li>
                <li>
                    <h3 className='header-sm'>See the winner</h3>
                    <FaTrophy className={`bg-${theme}`} color='rgb(255, 215, 0)' size={140} />
                </li>
            </ol>
        </div>
    )
}

function PlayerInput ({ label, onSubmit }) {
    const [ username, setUsername ] = React.useState('')
    const { theme } = React.useContext(ThemeContext)

    const handleSubmit = (event) => {
        event.preventDefault()

        onSubmit(username)
        setUsername('')
    }

    const handleChange = (event) => {
        event.preventDefault()
        setUsername(event.target.value)
    }

    return (
        <React.Fragment>
            <form className='column player' onSubmit={handleSubmit} >
                <label htmlFor='username' className='player-label'>
                    {label}
                </label>
                <div className='row player-inputs'>
                    <input
                      type='text'
                      id='username'
                      className={`input-${theme}`}
                      placeholder='github username'
                      autoComplete='off'
                      onChange={handleChange}
                      value={username}
                    />
                    <button
                      className={`btn ${theme === 'light' ? 'dark-btn' : 'light-btn'}`}
                      type='submit'
                      disabled={!username}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </React.Fragment>
    )
}


// Player input V2 with class variables
// class PlayerInput extends React.Component {
//     state = { username: '' }
//
//     static propTypes = {
//         onSubmit: PropTypes.func.isRequired,
//         label: PropTypes.string
//     }
//
//     handleSubmit = (event) => {
//         event.preventDefault()
//
//         this.props.onSubmit(this.state.username)
//         this.setState({
//             username: ''
//         })
//     }
//
//     handleChange = (event) => {this.setState({ username: event.target.value })}
//
//     render() {
//         return (
//             <div>
//                 <ThemeContext.Consumer>
//                     {({ theme }) => (
//                         <form className='column player' onSubmit={this.handleSubmit} >
//                             <label htmlFor='username' className='player-label'>
//                                 {this.props.label}
//                             </label>
//                             <div className='row player-inputs'>
//                                 <input
//                                     type='text'
//                                     id='username'
//                                     className={`input-${theme}`}
//                                     placeholder='github username'
//                                     autoComplete='off'
//                                     onChange={this.handleChange}
//                                     value={this.state.username}
//                                 />
//                                 <button
//                                     className={`btn ${theme === 'light' ? 'dark-btn' : 'light-btn'}`}
//                                     type='submit'
//                                     disabled={!this.state.username}
//                                 >
//                                     Submit
//                                 </button>
//                             </div>
//                         </form>
//                     )}
//                 </ThemeContext.Consumer>
//             </div>
//         );
//     }
// }

// Player input V1 (classic React class syntax)
// constructor(props) {
//     super(props);
//
//     this.state = {
//         username: ''
//     };
//
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
// }
//
// handleSubmit (event) {
//     event.preventDefault()
//
//     this.props.onSubmit(this.state.username)
//     this.setState({
//         username: ''
//     })
// }
//
// handleChange (event) {
//     this.setState({
//         username: event.target.value
//     })
// }
//
// Added as static value using new Class Fields
// PlayerInput.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//     label: PropTypes.string
// }

function PlayerPreview ({ username, onReset, label }) {
    const { theme } = React.useContext(ThemeContext)
    return (
        <div className='column player'>
            <h3 className='player-label'>{label}</h3>
            <div className={`row bg-${theme}`}>
                <div className='player-info'>
                    <img
                        src={`https://github.com/${username}.png?size=200`}
                        alt={`Avatar for ${username}`}
                        className='avatar-small'
                    />
                    <a
                        href={`https://github.com/${username}`}
                        className='link'
                    >
                        {username}
                    </a>
                    <button className='btn-clear flex-center' onClick={onReset}>
                        <FaTimesCircle color='rgb(194, 57, 42)' size={26}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
}

function Battle () {
    const initialState = {
        playerOne: null,
        playerTwo: null,
        battle: false
    }

    function battleReducer (state, action) {
        if (action.type === 'submit') {
            return {
                ...state,
                [action.id]: action.player
            }
        } else if (action.type === 'reset') {
            return {
                ...state,
                [action.id]: null
            }
        } else if (action.type === 'battle') {
            return {
                ...state,
                battle: true
            }
        }
    }

    const [ state, dispatch ] = React.useReducer(battleReducer, initialState)
    const { playerOne, playerTwo } = state

    return (
            <React.Fragment>
                <Instructions />

                <div className='players-container'>
                    <h1 className='center-text header-lg'>Players</h1>
                     <div className='row space-around'>
                         {playerOne === null
                             ? <PlayerInput
                                 onSubmit={(player) => dispatch({
                                     type: 'submit',
                                     id: 'playerOne',
                                     player
                                 })}
                                 label='Player One'
                                />
                             : <PlayerPreview
                                 label='Player One'
                                 onReset={() => dispatch({
                                     type: 'reset',
                                     id: 'playerOne'
                                 })}
                                 username={playerOne}
                                />

                         }
                         {playerTwo === null
                             ? <PlayerInput
                                 onSubmit={(player) => dispatch({
                                     type: 'submit',
                                     id: 'playerTwo',
                                     player
                                 })}
                                 label='Player Two'
                                />
                             : <PlayerPreview
                                 label='Player Two'
                                 onReset={() => dispatch({
                                     type: 'reset',
                                     id: 'playerTwo'
                                 })}
                                 username={playerTwo}
                                 />
                         }
                     </div>

                    {playerOne && playerTwo && (
                        <Link
                            className='btn dark-btn btn-space'
                            onClick={() => dispatch({type: 'battle'})}
                            to={{
                                pathname: '/battle/results',
                                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`

                            }}
                        >
                            Battle
                        </Link>
                    )}

                </div>
            </React.Fragment>
    );
}

// class Battle extends React.Component {
//     state = {
//         playerOne: null,
//         playerTwo: null,
//         battle: false
//     }
//
//     handleSubmit = (id, player) => this.setState({ [id]: player })
//     handleReset = (id) => this.setState({ [id]: null })
//
//     render() {
//         const { playerOne, playerTwo } = this.state
//
//         return (
//             <React.Fragment>
//                 <Instructions />
//
//                 <div className='players-container'>
//                     <h1 className='center-text header-lg'>Players</h1>
//                      <div className='row space-around'>
//                          {playerOne === null
//                              ? <PlayerInput
//                                  onSubmit={(player) => this.handleSubmit('playerOne', player)}
//                                  label='Player One'
//                                 />
//                              : <PlayerPreview
//                                  label='Player One'
//                                  onReset={() => this.handleReset('playerOne')}
//                                  username={playerOne}
//                                 />
//
//                          }
//                          {playerTwo === null
//                              ? <PlayerInput
//                                  onSubmit={(player) => this.handleSubmit('playerTwo', player)}
//                                  label='Player Two'
//                                 />
//                              : <PlayerPreview
//                                  label='Player Two'
//                                  onReset={() => this.handleReset('playerTwo')}
//                                  username={playerTwo}
//                                  />
//                          }
//                      </div>
//
//                     {playerOne && playerTwo && (
//                         <Link
//                             className='btn dark-btn btn-space'
//                             onClick={() => this.setState({battle: true})}
//                             to={{
//                                 pathname: '/battle/results',
//                                 search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
//
//                             }}
//                         >
//                             Battle
//                         </Link>
//                     )}
//
//                 </div>
//
//             </React.Fragment>
//         );
//     }
// }
// constructor(props) {
//     super(props);
//     this.state = {
//         playerOne: null,
//         playerTwo: null,
//         battle: false
//     };
//
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleReset = this.handleReset.bind(this);
// }
//
// handleSubmit (id, player) {
//     this.setState({
//         [id]: player
//     })
// }
//
// handleReset (id) {
//     this.setState({
//         [id]: null
//     })
// }


export default Battle;
