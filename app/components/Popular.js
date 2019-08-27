import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos} from "../utils/api";

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

export default class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: 'All',
            repos: {},
            error: null
        }

        this.updateLanguage = this.updateLanguage.bind(this);
        this.isLoading = this.isLoading.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage (selectedLanguage) {
        this.setState({
            selectedLanguage,
            error: null
        })

        if (!this.state.repos[selectedLanguage]) {
            fetchPopularRepos(selectedLanguage)
                .then((data) => {
                    this.setState(({ repos }) => ({
                        repos: {
                            ...repos,
                             [selectedLanguage]: data
                        }
                    }))
                })
                .catch((error) => {
                    console.warn('Error fetching repos: ', error)
                    this.setState({
                        error: 'There was an error fetching the repositories'
                    })
                })
        }
    }

    isLoading() {
        const { selectedLanguage, repos, error} = this.state
        return !repos[selectedLanguage] && error === null
    }

    render() {
        const { selectedLanguage, repos, error } = this.state
        return (
            <React.Fragment>
                <LanguagesNav
                    selected={selectedLanguage}
                    updateLanguage={this.updateLanguage}
                />

                {this.isLoading() && <p>LOADING</p>}

                {error && <p>{error}</p>}

                {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}
            </React.Fragment>
        )
    }
}

// also works thats neat
//       return LanguagesNav({
//                 selected: this.state.selectedLanguage,
//                 updateLanguage: this.updateLanguage
//        })
