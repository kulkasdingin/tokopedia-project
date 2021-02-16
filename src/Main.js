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
import PatchPage from "./Page/PatchPage";
import ls from 'local-storage'
import swal from '@sweetalert/with-react'
class Main extends Component {
    handleReset() {
        swal("Are you sure?", "Your game will reset, this can be useful if you want to catch from scratch or countering error in capturing GMAX Pokemon", {
            buttons: {
                cancel: "Cancel",
                reset: {
                    text: 'Proceed',
                    value: 'reset'
                }
            }
        })
        .then((value)=> {
            switch(value) {
                case "reset":
                    ls.clear();
                    swal("Game has been successfully reset")
                    .then(()=> window.location.href="/");                    
                    break;

                default:
                    swal('Action canceled! Game will not reset')
            }
        })
    }
    render() {
        return (
            <Router>
                <div>
                    <nav id="header" className="navbar navbar-expand-md navbar-dark bg-dark fixed-top pt-2 pb-2">
                        <div className="container-fluid flex-wrap flex-md-nowrap">
                            <Link to="/" className="navbar-brand" >Tokopedia Project</Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                                    <li className="nav-item"><Link to="/pokemon-own" className="nav-link">Pokemon Own</Link></li>
                                    <li className="nav-item"><span className="nav-link cursor-pointer" onClick={()=>this.handleReset()}>Reset Game</span></li>
                                    <li className="nav-item"><Link to="/patch" className="nav-link">Patch Note</Link></li>
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
                                <Route path="/patch">
                                    <PatchPage/>
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