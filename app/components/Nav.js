import React from 'react'
import { ThemeConsumer } from "../contexts/Theme";

export default function Nav () {
    return (
        <ThemeConsumer>
            {({ theme, toggleTheme }) => (
                <nav className="row space-between">
                    <button
                        style={{
                            fontSize: 30,
                            color: 'blue'
                        }}
                        className='btn-clear'
                        onClick={toggleTheme}
                    >
                        {theme === 'light' ? 'Dark' : 'Light'}
                    </button>
                </nav>
            )}
        </ThemeConsumer>
    )
}
