import React, {Component} from 'react'
import { withRouter } from 'react-router-dom';
import './PokemonDetailPage.css'
import background from './Image/pokemonbackground.png'
import pokeball from './Image/pokeball.png'
import ls from 'local-storage'
import swal from '@sweetalert/with-react'

class PokemonDetailPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            pokemon: props.match.params.pokemon,
            pokemonClass: 'pokemon',
            pokeballClass: 'pokeball',
            catchDisabled: false,
            isCatched: false,
            isNameTaken: false,
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
            if (chance >= .05) {
                this.setState({
                    isCatched: true
                })
                swal("Success!", this.state.pokemon.name + " Has Been Succesfully Caught", "success")
            } else {
                swal("Failed!", this.state.pokemon.name + " resist the catch attemp!", "error")
                this.setState({
                    pokeballClass:"pokeball",
                    pokemonClass:"pokemon",
                    catchDisabled: false,
                })
            }
        },7450);
    }

    submitName = () => {
        let temp = (ls.get(this.state.pokemon.name)==undefined ? []: ls.get(this.state.pokemon.name));
        console.log(temp);
        if (temp.indexOf(this.state.pokemonCatchedName)<0) {
            temp.push(this.state.pokemonCatchedName);
            let owned_pokemon = (ls.get('pokemon_own')==undefined ? []: ls.get('pokemon_own'));
            if (owned_pokemon.indexOf(this.state.pokemon.name+'-'+this.state.pokemon.id)<0) {
                console.log(owned_pokemon);
                owned_pokemon.push(this.state.pokemon.name+'-'+this.state.pokemon.id);
                ls.set('pokemon_own', owned_pokemon);
                console.log(ls.get('pokemon_own'))
            }
            ls.set(this.state.pokemon.name, temp);
            ls.set(this.state.pokemon.name+'_own', temp.length)
            swal("Success!", this.state.pokemonCatchedName+ " Has Been Succesfully Caught", "success")
            this.setState({
                isNameTaken: false, 
                isCatched: false, 
                catchDisabled:false, 
                pokeballClass:"pokeball",
                pokemonClass:"pokemon",
                pokemonCatchedName: '', 
            })
        } else {
            this.setState({isNameTaken: true})
        }
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
                                <label className={'form-label text-red small ' + (this.state.isNameTaken ? 'd-block': 'd-none')}>name already taken!</label>
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