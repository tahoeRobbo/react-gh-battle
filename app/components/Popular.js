import React from 'react'
import PropTypes from 'prop-types'

import { fetchPopularRepos} from "../utils/api";
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from "react-icons/fa"

import Card from "./Card";
import Loading from "./Loading";
import Tooltip from "./Tooltip";

function LanguagesNav ({selected, updateLanguage}) {
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']

    return (
        <ul className='flex-center'>
            {languages.map((language, i) =>
                <li key={i}>
                    <button
                        className='btn-clear nav-link'
                        style={language === selected ? {color: 'rgb(69, 210, 187)'} : null}
                        onClick={() => updateLanguage(language)}>
                            {language}
                    </button>
                </li>
            )}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    updateLanguage: PropTypes.func.isRequired
};

function ReposGrid ({ repos }) {
    return (
        <ul className='grid space-around'>
            {repos.map((repo, i) => {
                const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
                const { login, avatar_url } = owner

                return (
                    <li key={html_url}>
                        <Card
                            href={html_url}
                            avatar={avatar_url}
                            name={login}
                            header={`#${i+1}`}
                        >
                            <ul className='card-list'>
                                <li>
                                    <Tooltip text="Github username">
                                        <FaUser color='rgb(255, 191, 116)'/>
                                        <a href={`https://github.com/${login}`}>
                                            {login}
                                        </a>
                                    </Tooltip>
                                </li>
                                <li>
                                    <FaStar color='rgb(255, 215, 0)'/>
                                    {stargazers_count.toLocaleString()} stars
                                </li>
                                <li>
                                    <FaCodeBranch color='rgb(129, 195, 245)'/>
                                    {forks.toLocaleString()} forks
                                </li>
                                <li>
                                    <FaExclamationTriangle color='rgb(241, 138, 147)'/>
                                    {open_issues.toLocaleString()} open issues
                                </li>
                            </ul>
                        </Card>
                    </li>
                )
            })}
        </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired,
}

function popularReducer (state, action) {
    if (action.type === 'success') {
        return {
            ...state,
            [action.selectedLanguage]: action.repos,
            error: null
        }
    } else if (action.type === 'error') {
        return {
            ...state,
            error: action.error
        }
    } else {
        throw new Error('that action type is not supported')
    }
}

export default function Popular () {
    const [ selectedLanguage, setSelectedLanguage ] = React.useState('All')
    const [ state, dispatch ] = React.useReducer(
      popularReducer,
      { error: null }
    )

    const fetchedLanguages = React.useRef([])

    React.useEffect(() => {
        if (fetchedLanguages.current.includes(selectedLanguage) === false) {
            fetchedLanguages.current = fetchedLanguages.current.concat([selectedLanguage])
            fetchPopularRepos(selectedLanguage)
              .then((repos) => {
                dispatch({
                    type: 'success',
                    repos,
                    selectedLanguage
                })
              })
              .catch((error) => {
                fetchedLanguages.current = fetchedLanguages.current.filter((lang) => lang !== selectedLanguage)
                dispatch({
                    type: 'error',
                    error
                })
              })
        }
    }, [fetchedLanguages, selectedLanguage])

    const isLoading = () => {
        return !state[selectedLanguage] && state.error === null
    }


    return (
      <React.Fragment>
          <LanguagesNav
            selected={selectedLanguage}
            updateLanguage={setSelectedLanguage}
          />

          {isLoading() && <Loading text='Fetching Repos' />}

          {state.error && <p className='center-text error'>{state.error}</p>}

          {state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}
      </React.Fragment>
    )
}

// export default class Popular extends React.Component {
//     state = {
//         selectedLanguage: 'All',
//         repos: {},
//         error: null
//     }
//
//     updateLanguage = (selectedLanguage) => {
//         this.setState({
//             selectedLanguage,
//             error: null
//         })
//
//         if (!this.state.repos[selectedLanguage]) {
//             fetchPopularRepos(selectedLanguage)
//                 .then((data) => {
//                     this.setState(({ repos }) => ({
//                         repos: {
//                             ...repos,
//                             [selectedLanguage]: data
//                         }
//                     }))
//                 })
//                 .catch((error) => {
//                     console.warn('Error fetching repos: ', error)
//                     this.setState({
//                         error: 'There was an error fetching the repositories'
//                     })
//                 })
//         }
//     }
//
//     isLoading = () => {
//         const { selectedLanguage, repos, error} = this.state
//         return !repos[selectedLanguage] && error === null
//     }
//
//     componentDidMount() {
//         this.updateLanguage(this.state.selectedLanguage)
//     }
//
//     render() {
//         const { selectedLanguage, repos, error } = this.state
//         return (
//             <React.Fragment>
//                 <LanguagesNav
//                     selected={selectedLanguage}
//                     updateLanguage={this.updateLanguage}
//                 />
//
//                 {this.isLoading() && <Loading text='Fetching Repos' />}
//
//                 {error && <p className='center-text error'>{error}</p>}
//
//                 {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
//             </React.Fragment>
//         )
//     }
// }

// constructor(props) {
//     super(props)
//
//     this.state = {
//         selectedLanguage: 'All',
//         repos: {},
//         error: null
//     }
//
//     this.updateLanguage = this.updateLanguage.bind(this);
//     this.isLoading = this.isLoading.bind(this);
// }


// updateLanguage (selectedLanguage) {
//     this.setState({
//         selectedLanguage,
//         error: null
//     })
//
//     if (!this.state.repos[selectedLanguage]) {
//         fetchPopularRepos(selectedLanguage)
//             .then((data) => {
//                 this.setState(({ repos }) => ({
//                     repos: {
//                         ...repos,
//                          [selectedLanguage]: data
//                     }
//                 }))
//             })
//             .catch((error) => {
//                 console.warn('Error fetching repos: ', error)
//                 this.setState({
//                     error: 'There was an error fetching the repositories'
//                 })
//             })
//     }
// }
//
// isLoading() {
//     const { selectedLanguage, repos, error} = this.state
//     return !repos[selectedLanguage] && error === null
// }


// also works thats neat
//       return LanguagesNav({
//                 selected: this.state.selectedLanguage,
//                 updateLanguage: this.updateLanguage
//        })
