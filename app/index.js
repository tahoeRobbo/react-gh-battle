import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// import Popular from "./components/Popular";
// import Battle from "./components/Battle";
// import Results from "./components/Results";
import Nav from "./components/Nav";
import Loading from "./components/Loading";

import { ThemeProvider } from "./contexts/Theme";

import './index.css'

const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))

class App extends React.Component {
    // new Class Fields way.  Currently in stage 3 spec and popular in the community.
    // must be used with @babel/plugin-proposal-class-properties

    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({ theme }) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            }))
        }
    }


    // ES6 class spec
    // **************

    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         theme: 'light',
    //         toggleTheme: () => {
    //             this.setState(({ theme }) => ({
    //                 theme: theme === 'light' ? 'dark' : 'light'
    //             }))
    //         }
    //     }
    // }

    render() {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className="container">
                            <Nav />
                            <React.Suspense fallback={<Loading />}>
                                <Switch>
                                    <Route exact path='/' component={Popular} />
                                    <Route exact path='/battle' component={Battle} />
                                    <Route path='/battle/results' component={Results} />
                                    {/*<Route component={FourOhFour} /> TODO implement a 404 component? */}
                                    <Route render={() => <h1>404</h1>} />
                                </Switch>
                            </React.Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
