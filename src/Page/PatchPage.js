import React, { Component } from 'react'

class PatchPage extends Component {
    render() {
        return(
            <div className="row gap-y">
                <div className="col-12">
                    <p>Patch Note</p>
                    <ul>
                        <li>v1.0.1 Fix bug after reset game</li>
                        <li>Change log</li>
                        <ul>
                            <li>Change window.location.refresh to window.location.href after the game reset</li>
                        </ul>
                    </ul>
                    <br/>
                    <ul>
                        <li>v1.0.0 Release Full Working Feature</li>
                        <li>Known bug</li>
                        <ul>
                            <li>Pokemon can only be catch until Number #898 (Calyrex). This happen since there's no direct number base query for pokemon yet. The bug occured since the the app send the query by offseting the query by the (pokemonNumber - 1) for the work around of number base query. However, the number of pokemons after Calyrex are not sequential anymore. Therefore, the query can't found the pokemon that number higher than Calyrex in your Pokemon Own Section and will show some error. If you accidentally (or just curious) reproduce the bug, you can force release all your catch pokemon by reset the game and the bug will dissapear.</li>
                            <li>There's some warning after moving the limit slider in home, i tried to solve it but haven't found the problem yet im sorry dont judge me</li>
                            <li>There's also some issue for some pokemon after Calyrex (number more than #898) that not showing their picture. I'm pretty sure that i did no mistake in showing the image, it occur since the returned image URL from the query is not valid and the request from that image return an 404 not found</li>
                        </ul>
                        <li>Test for this app will be provided soon</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default PatchPage