import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';
import ls from 'local-storage'
import swal from 'sweetalert';

class PokemonOwnPage extends Component {
    constructor(props) {
        super(props)
        this.state= {
            pokemonsOwned: []
        }
    }

    ownedPokemonInit () {
        let ownedPokemonNameWithId = ls.get('pokemon_own');

        let temp = ownedPokemonNameWithId.map((row, index)=> {
            return row.split("-")
        })

        let pokemon = temp.map((row,index)=>{
            this.fetchPokemonsById(1, row[1]-1)
        })
    }

    fetchPokemonsById (limit, offset) {
        const gqlQuery = `
            query pokemons($limit: Int, $offset: Int) {
                pokemons(limit: $limit, offset: $offset) {
                    results {
                        id
                        name
                        image
                    }
                }
            }
        `;
    
        const gqlVariables = {
            limit: limit,
            offset: offset,
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
            let tempRes = {
                pokemon: res.data.pokemons.results[0],
                ownedListName: ls.get(res.data.pokemons.results[0].name),
                ownedTotal: ls.get(res.data.pokemons.results[0].name+'_own'),
            }
            let temp = this.state.pokemonsOwned;
            temp.push(tempRes)
            this.setState({pokemonsOwned: temp})
        })
        
    }

    releasePokemon = (pokemon, name, id) => {
        console.log(pokemon, name)
        swal("Are you sure you want to release " + name + "?", {
            buttons: {
                cancel: "Nooo!",
                release: {
                    text: 'Yes',
                    value: 'release'
                }
            }
        })
        .then((value) => {
            switch(value) {
                case "release":
                    swal(name + ' has been release safely!', 'It is ok to release someone we love sometimes', 'success');
                    let pokemonOwnedList = ls.get(pokemon);
                    pokemonOwnedList.splice(pokemonOwnedList.indexOf(name), 1);
                    ls.set(pokemon, pokemonOwnedList)
                    if (pokemonOwnedList.length<1) {
                        let ownedPokemonNameWithId = ls.get('pokemon_own');
                        ownedPokemonNameWithId.splice(ownedPokemonNameWithId.indexOf(pokemon+'-'+id),1)
                        console.log(pokemon+'-'+id)
                        ls.set('pokemon_own', ownedPokemonNameWithId);
                    }
                    ls.set(pokemon+'_own', pokemonOwnedList.length)
                    this.setState({pokemonsOwned: []})
                    this.ownedPokemonInit();
                    break;

                default:
                    swal('Action canceled!', name + ' still live happily in your pocket!')
            }
        })

    }

    PokemonsList = () => {

        const rows = this.state.pokemonsOwned.map((row, index) => {
            return (
                <div className={'col-12 col-md-4 ' + (index%2==1 ? '' : 'offset-md-2')} key={index}>
                    <div className="card">
                        <div className="image-frame">
                            <NavLink to={{ 
                                pathname:'/pokemon-detail/'+row.pokemon.name,
                                state: {image:row.pokemon.image}
                                }}>
                                <img className="card-img-top pokemon-image-first" src={row.pokemon.image}></img>
                            </NavLink>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-capitalize">{row.pokemon.name}</h5>
                            <p className="card-text mb-1">You own {row.ownedTotal || 0} of this Pokemon</p>
                            {
                                row.ownedListName.map((row2, index2)=>{
                                    return (
                                        <div className="row border-bottom pt-2" key={index2}>
                                            <div className="col-8">
                                                <p className="mt-1">{row2}</p>
                                            </div>
                                            <div className="col-4">
                                            <button className="fire text-capitalize pokemon-move cursor-pointer" onClick={() => this.releasePokemon(row.pokemon.name, row2, row.pokemon.id)}>Release</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            )
        })
    
        return (
            rows
        )
    }

    componentDidMount() {
        this.ownedPokemonInit();
    }

    render (){
        return(
            <div className="row gap-y mt-5">
                <this.PokemonsList/>
            </div>
        )
    }
}

export default PokemonOwnPage