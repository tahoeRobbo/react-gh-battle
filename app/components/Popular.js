import React from 'react'

export default class Popular extends React.Component {
    render() {
        const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']

        return (
            <ul className='flex-center'>
                {languages.map((language, i) =>
                    <li key={i}>
                        <button className='btn-clear nav-link'>{language}</button>
                    </li>
                )}
            </ul>
        )
    }
}
