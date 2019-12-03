import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string'
import { Link } from 'react-router-dom'

import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from "react-icons/fa";

import Card from "./Card";
import { battle } from "../utils/api";
import Loading from "./Loading";
import Tooltip from "./Tooltip";

function ProfileList ({ profile }) {
    return (
        <ul className='card-list'>
            <li>
                <FaUser color='rgb(239, 115, 115)' size={22} />
                {profile.name}
            </li>
            {profile.location && (
                <li>
                    <Tooltip text="User's location">
                        <FaCompass color='rgb(144, 115, 255)' size={22} />
                        {profile.location}
                    </Tooltip>
                </li>
            )}
            {profile.company && (
                <li>
                    <Tooltip text="User's company">
                        <FaBriefcase color='#795548' size={22} />
                        {profile.company}
                    </Tooltip>
                </li>
            )}
            <li>
                <FaUsers color='rgb(129, 195, 245)' size={22} />
                {profile.followers.toLocaleString()} followers
            </li>
            <li>
                <FaUserFriends color='rgb(64, 183, 95 )' size={22} />
                {profile.following.toLocaleString()} following
            </li>
        </ul>
    )
}

ProfileList.propTypes = {
    profile: PropTypes.object.isRequired
}

const initialState = {
    winner: null,
    loser: null,
    error: null,
    loading: true
}

function resultsReducer (state, action) {
    if (action.type === 'success') {
        return {
            ...state,
            winner: action.players[0],
            loser: action.players[1],
            loading: false
        }
    } else if (action.type === 'error') {
        return {
            ...state,
            error: action.error.message,
            loading: false
        }
    } else {
        throw new Error('That action type is not supported')
    }
}

function Results ({ location }) {
    const [ state, dispatch ] = React.useReducer(
        resultsReducer,
        initialState
    )
    const { playerOne, playerTwo } = queryString.parse(location.search)
    const { winner, loser, loading } = state

    React.useEffect(() => {
        battle([playerOne, playerTwo])
        .then((players) => dispatch({ type: 'success', players}))
        .catch(({ error }) => dispatch({ type: 'error', error}))
    }, [playerOne, playerTwo])

    if (loading === true) {
        return <Loading />
    }

    return (
      <React.Fragment>
          <div className='grid space-around container-sm'>
              <Card href={winner.profile.html_url}
                    avatar={winner.profile.avatar_url}
                    name={winner.profile.login}
                    header={winner.score === loser.score ? 'Tie' : 'Winner'}
                    subheader={`Score: ${winner.score.toLocaleString()}`}
              >
                  <ProfileList profile={winner.profile}/>
              </Card>
              <Card
                header= {winner.score === loser.score ? 'Tie' : 'Loser'}
                subheader={`Score: ${loser.score.toLocaleString()}`}
                avatar={loser.profile.avatar_url}
                href={loser.profile.html_url}
                name={loser.profile.login}
              >
                  <ProfileList profile={loser.profile}/>
              </Card>

          </div>
          <Link to='/battle' className='btn dark-btn btn-space'>Reset</Link>
      </React.Fragment>
    );
}

// class Results extends React.Component {
//     state = {
//         winner: null,
//         loser: null,
//         error: null,
//         loading: true
//     }
//
//     componentDidMount() {
//         const { playerOne, playerTwo } = queryString.parse(this.props.location.search)
//
//         battle([playerOne, playerTwo])
//             .then((players) => dispatch({ type: 'success', players}))
//             .catch(({ error }) => dispatch({ type: 'error', error}))
//     }
//
//     render() {const { winner, loser, error, loading } = this.state
//         if (loading === true) {
//             return <Loading />
//         }
//
//         return (
//             <React.Fragment>
//                <div className='grid space-around container-sm'>
//                    <Card href={winner.profile.html_url}
//                          avatar={winner.profile.avatar_url}
//                          name={winner.profile.login}
//                          header={winner.score === loser.score ? 'Tie' : 'Winner'}
//                          subheader={`Score: ${winner.score.toLocaleString()}`}
//                    >
//                        <ProfileList profile={winner.profile}/>
//                    </Card>
//                    <Card
//                         header= {winner.score === loser.score ? 'Tie' : 'Loser'}
//                         subheader={`Score: ${loser.score.toLocaleString()}`}
//                         avatar={loser.profile.avatar_url}
//                         href={loser.profile.html_url}
//                         name={loser.profile.login}
//                    >
//                       <ProfileList profile={loser.profile}/>
//                    </Card>
//
//                </div>
//                 <Link to='/battle' className='btn dark-btn btn-space'>Reset</Link>
//             </React.Fragment>
//         );
//     }
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         winner: null,
    //         loser: null,
    //         error: null,
    //         loading: true
    //     };
    // }

export default Results;
