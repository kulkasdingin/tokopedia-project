import React, {Component} from 'react'
import { withRouter } from 'react-router-dom';
import './PokemonDetailPage.css'
import background from './Image/pokemonbackground.png'
import pokeball from './Image/pokeball.png'

class PokemonDetailPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            pokemon: props.match.params.pokemon,
            pokemonClass: 'pokemon',
            pokeballClass: 'pokeball',
            catchDisabled: false,
            isCatched: false,
            pokemonCatchedName: '',
        };
    }

    getQueryStringParams = query => { //https://stackoverflow.com/questions/42862253/how-to-parse-query-string-in-react-router-v4
        return query
            ? (/^[?#]/.test(query) ? query.slice(1) : query)
                .split('&')
                .reduce((params, param) => {
                        let [key, value] = param.split('=');
                        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                        return params;
                    }, {}
                )
            : {}
    };

    getPokemon(name) {
        const gqlQuery = `
            query pokemon($name: String!) {
                pokemon(name: $name){
                    id
                    name
                    stats{
                      stat{
                        name
                      }
                      base_stat
                      effort
                    }
                    forms{
                      name
                    }
                    moves{
                        move{
                          name
                        }
                    }
                    types{
                      type {
                        name
                      }
                    }
                    height
                    weight
                  }
            }
        `;
    
        const gqlVariables = {
            name:name
        }
    
        fetch('https://graphql-pokeapi.vercel.app/api/graphql', {
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: gqlQuery,
                variables: gqlVariables,
            }),
            method: 'POST',
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            this.setState({
                pokemon:res.data.pokemon
            })
        })
    
    }

    PokemonType = () => {
        const pokemonTypes = this.state.pokemon.types.map((row,index)=>{
            return(
                <button key={index} className={row.type.name + ' text-capitalize pokemon-type'}>{row.type.name}</button>
            )
        })

        return pokemonTypes
    }

    PokemonMove = () => {
        const pokemonMoves = this.state.pokemon.moves.map((row,index)=>{
            return(
                <button key={index} className={'normal text-capitalize pokemon-move'}>{row.move.name}</button>  
            )
        })

        return pokemonMoves
    }

    catchPokemon = () => {
        this.setState({pokeballClass:"pokeball-catch", catchDisabled: true});
        setTimeout(() => this.setState({pokeballClass:"pokeball-catch after"}),50);
        setTimeout(() => this.setState({pokemonClass:"pokemon catch"}),550);
        setTimeout(() => this.setState({pokemonClass:"pokemon catch after"}),850);
        setTimeout(() => this.setState({pokeballClass:"pokeball-catch after drop"}),1150);
        setTimeout(() => this.setState({pokeballClass:"pokeball-catch after drop shake"}),1450);
        setTimeout(() => this.setState({pokeballClass:"pokeball-catch after drop"}),2450);
        setTimeout(() => this.setState({pokeballClass:"pokeball-catch after drop shake"}),3450);
        setTimeout(() => this.setState({pokeballClass:"pokeball-catch after drop"}),4450);
        setTimeout(() => this.setState({pokeballClass:"pokeball-catch after drop shake"}),5450);
        setTimeout(() => this.setState({pokeballClass:"pokeball-catch after drop"}),6450);
        setTimeout(() => {
            let chance = Math.random();
            if (chance >= .50) {
                this.setState({
                    isCatched: true
                })
                alert('Catch')
            } else {
                alert('fail')
                this.setState({
                    pokeballClass:"pokeball",
                    pokemonClass:"pokemon",
                    catchDisabled: false,
                })
            }
        },7450);
    }

    submitName = () => {

    }

    handleChange = (event) => {
        const {name, value} = event.target

        this.setState({
            [name]: value,
        })
    }

    componentDidMount() {
        this.getPokemon(this.state.pokemon);
    }

    render() {
        
        return (
            <div className="row p-3">
                <div className="col-md-6 column-pokemon-data pb-3">
                    <div className="row gap-y">
                        <div className="col-md-4 offset-md-4 text-center">
                            <img src={this.props.location.state && this.props.location.state.image || ''} className="img-fluid w-100"></img>
                        </div>
                        <div className="col-12 text-capitalize text-center">
                            <h3>{this.state.pokemon.name}</h3>
                            {
                                this.state.pokemon.types &&
                                <this.PokemonType/>
                            }
                        </div>
                        <div className="col-12 text-center text-capitalize">
                            <h4>moves</h4>
                            {
                                this.state.pokemon.moves &&
                                <this.PokemonMove/>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-6 column-pokemon-catching-range mt-3 mt-md-0 pb-5">
                    <div className="row pb-5 row-pokemon-catching-range">
                        <div className="col-12 text-capitalize text-center mt-3">
                            <h1>Catching Range</h1>
                        </div>
                        <div className="col-12 mt-3">
                            <div className="background-frame">
                                <img src={background} className="image-background"/>
                                <img src={this.props.location.state && this.props.location.state.image || ''} className={this.state.pokemonClass}></img>
                                <img src={pokeball} className={this.state.pokeballClass}></img>
                            </div>
                        </div>
                        <div className={'col-12 mt-3 text-center ' + (this.state.isCatched ? 'd-block' : 'd-none')}>
                                <label className="form-label">Name your Pokemon!</label>
                                <input type="email" className="form-control" name="pokemonCatchedName" value={this.state.pokemonCatchedName} onChange={this.handleChange}/>
                                <button className="normal text-capitalize pokemon-move mt-3" onClick={()=> this.submitName()}>Save</button>
                        </div>
                        <div className={'col-12 mt-3 text-center ' + (this.state.isCatched ? 'd-none' : 'd-block')}>
                            <button className="normal text-capitalize pokemon-move" onClick={()=> this.catchPokemon()} disabled={this.state.catchDisabled}>Catch</button>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default withRouter(PokemonDetailPage);