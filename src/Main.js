import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import PokemonsPage from './Page/PokemonsPage'
import PokemonDetailPage from './Page/PokemonDetailPage'

class Main extends Component {
    render() {
        return (
            <Router>
                <div>
                    <header id="header" className="header fixed-top">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/pokemon-detail/ditto">Pokemon Detail</Link></li>
                            <li><Link to="/pokemon-own">Pokemon Own</Link></li>
                        </ul>
                    </header>
                    <section className="mt-5">
                        <div className="container">
                            <Switch>
                                <Route path="/pokemon-detail/:pokemon">
                                    <PokemonDetailPage/>
                                </Route>
                                <Route path="/">
                                    <PokemonsPage/>
                                </Route>
                            </Switch>
                        </div>
                    </section>

                </div>
            </Router>
        )
    }
}

export default Main;