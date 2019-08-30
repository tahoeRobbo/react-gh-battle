import React from 'react';
import PropTypes from 'prop-types';

import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from "react-icons/fa";

import { battle } from "../utils/api";

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        };
    }


    componentDidMount() {
        const { playerOne, playerTwo } = this.props

        battle([playerOne, playerTwo])
            .then((players) => {
                this.setState({
                    winner: players[0],
                    loser: players[1],
                    error: null,
                    loading: false
                })
            })
            .catch(({ message }) => {
                this.setState({
                    error: message,
                    loading: false
                })
            })
    }

    render() {
        const { winner, loser, error, loading } = this.state

        if (loading === true) {
            return <p>LOADING</p>
        }



        return (
            <div>
               <div className='grid space-around container-sm'>
                   Results
                   <div className='card bg-light'>
                       <h4 className='header-lg center-text'>
                           {winner.score === loser.score ? 'Tie' : 'Winner'}
                       </h4>
                       <img
                           className='avatar'
                           src={winner.profile.avatar_url}
                           alt={`Avatar for ${winner.profile.login}`}
                        />
                        <h4 className='center-text'>
                            Score: {winner.score.toLocaleString()}
                        </h4>
                        <h2 className='center-text'>
                            <a href={winner.profile.html_url} className='link'>
                                {winner.profile.login}
                            </a>
                        </h2>
                       <ul className='card-list'>
                           <li>
                               <FaUser color='rgb(239, 115, 115)' size={22} />
                               {winner.profile.name}
                           </li>
                           {winner.profile.location && (
                               <li>
                                   <FaCompass color='rgb(144, 115, 255)' size={22} />
                                   {winner.profile.location}
                               </li>
                           )}
                           {winner.profile.company && (
                               <li>
                                   <FaBriefcase color='#795548' size={22} />
                                   {winner.profile.company}
                               </li>
                           )}
                           <li>
                               <FaUsers color='rgb(129, 195, 245)' size={22} />
                               {winner.profile.followers.toLocaleString()} followers
                           </li>
                           <li>
                               <FaUserFriends color='rgb(64, 183, 95 )' size={22} />
                               {winner.profile.following.toLocaleString()} following
                           </li>
                       </ul>
                   </div>
                   <div className='card bg-light'>
                       <h4 className='header-lg center-text'>
                           {winner.score === loser.score ? 'Tie' : 'Loser'}
                       </h4>
                       <img
                           className='avatar'
                           src={loser.profile.avatar_url}
                           alt={`Avatar for ${loser.profile.login}`}
                       />
                       <h4 className='center-text'>
                           Score: {loser.score.toLocaleString()}
                       </h4>
                       <h2 className='center-text'>
                           <a href={loser.profile.html_url} className='link'>
                               {loser.profile.login}
                           </a>
                       </h2>
                       <ul className='card-list'>
                           <li>
                               <FaUser color='rgb(239, 115, 115)' size={22} />
                               {loser.profile.name}
                           </li>
                           {loser.profile.location && (
                               <li>
                                   <FaCompass color='rgb(144, 115, 255)' size={22} />
                               {loser.profile.location}
                               </li>
                           )}
                           {loser.profile.company && (
                               <li>
                                   <FaBriefcase color='#795548' size={22} />
                               {loser.profile.company}
                               </li>
                           )}
                           <li>
                               <FaUsers color='rgb(129, 195, 245)' size={22} />
                               {loser.profile.followers.toLocaleString()} followers
                           </li>
                           <li>
                               <FaUserFriends color='rgb(64, 183, 95 )' size={22} />
                               {loser.profile.following.toLocaleString()} following
                           </li>
                       </ul>
                   </div>
               </div>

            </div>
        );
    }
}

Results.propTypes = {
    playerOne: PropTypes.string.isRequired,
    playerTwo: PropTypes.string.isRequired
};

export default Results;
