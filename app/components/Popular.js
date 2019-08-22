import React from 'react'

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

export default class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: 'All'
        }

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage (selectedLanguage) {
        this.setState({
            selectedLanguage: selectedLanguage
        })
    }

    render() {
        const { selectedLanguage } = this.state

        return (
            <React.Fragment>
                <LanguagesNav
                    selected={selectedLanguage}
                    updateLanguage={this.updateLanguage}
                />>
            </React.Fragment>
        )
    }
}

// also works thats neat
//       return LanguagesNav({
//                 selected: this.state.selectedLanguage,
//                 updateLanguage: this.updateLanguage
//        })
