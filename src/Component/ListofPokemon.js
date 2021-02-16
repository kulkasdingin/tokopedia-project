import ls from 'local-storage';
import { NavLink } from 'react-router-dom';
import './ListofPokemon.css';

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Own</th>
                <th>Act</th>
            </tr>
        </thead>
    )
}

const catchPokemon = (row, props) => {
    ls.set(row.name, (ls.get(row.name) !=undefined ? (ls.get(row.name)+1): 1));
    props.handleCatch()
}

const releasePokemon = (row, props) => {
    ls.set(row.name, 0);
    props.handleCatch();
}

const zeroPad = (num, places) => { //https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

const PokemonsList = (props) => {

    const rows = props.pokemonsData.map((row, index) => {
        let id = zeroPad(row.id,3);
        return (
            <div className="col-6 col-md-3" key={index}>
                <div className="card">
                    <div className="image-frame">
                        <NavLink to={{ 
                            pathname:'/pokemon-detail/'+row.name,
                            state: {image:row.image}
                            }}>
                            <img className="card-img-top pokemon-image-first" src={row.image}></img>
                        </NavLink>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title text-capitalize">{row.name}</h5>
                        <p className="card-text">You own {row.own || 0} of this Pokemon</p>
                    </div>
                </div>
            </div>
        )
    })

    return (
        rows
    )
}

const Pokemons = (props) => {
    const {pokemonsData, handleCatch} = props

    return (
        <div className="row gap-y">
            <PokemonsList pokemonsData={pokemonsData} handleCatch={handleCatch}/>
        </div>
    )
}

export default Pokemons