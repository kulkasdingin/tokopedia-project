import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import PokemonsPage from './Page/PokemonsPage'
import PokemonDetailPage from './Page/PokemonDetailPage'
import PokemonOwnPage from "./Page/PokemonOwnPage";

class Main extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav id="header" className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                        <div className="container-fluid flex-wrap flex-md-nowrap">
                            <Link to="/" className="navbar-brand" >Tokopedia Project</Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                                    <li className="nav-item w-100"><Link to="/pokemon-own" className="nav-link">Pokemon Own</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <section className="mt-6">
                        <div className="container">
                            <Switch>
                                <Route path="/pokemon-detail/:pokemon">
                                    <PokemonDetailPage/>
                                </Route>
                                <Route path="/pokemon-own">
                                    <PokemonOwnPage/>
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