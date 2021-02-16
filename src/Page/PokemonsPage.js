import React, {Component} from 'react'
// import FetchJS from './Fetch.js'
// import {getAllPokemons} from './Function/Fetch.js'
import Pokemons from './../Component/ListofPokemon'
import ls from 'local-storage'

class PokemonsPage extends Component {
    state = {
        query:[],
        pokemons:[]
    }

    getAllPokemons(limit, offset) {
        const gqlQuery = `
            query pokemons($limit: Int, $offset: Int) {
                pokemons(limit: $limit, offset: $offset) {
                    count
                    next
                    previous
                    status
                    message
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
            console.log(res)
            this.setState({
                query:res.data.pokemons
            })
            this.initPokemons();
        })
    
    }

    initPokemons() {
        let pokemons = this.state.query.results

        let temp = []
        pokemons.map((row,index) => {
            const [id, image, name, own] = ["id","image","name", "own"]
            let temp_pokemon = {}
            temp_pokemon[id] = row.id
            temp_pokemon[image] = row.image
            temp_pokemon[name] = row.name
            temp_pokemon[own] = ls.get(row.name+'_own')
            temp.push(temp_pokemon)
        })

        this.setState({
            pokemons:temp
        })
    }

    handleCatch = () => {
        this.initPokemons()
    }

    componentDidMount() {
        this.getAllPokemons(25,0)
    }

    render (){
        return(
            <div className="row">
                <div className="col-md-12">
                    <Pokemons pokemonsData={this.state.pokemons} handleCatch={this.handleCatch}/>
                </div>
            </div>
        )
    }
}

export default PokemonsPage