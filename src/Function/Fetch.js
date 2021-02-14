export function getAllPokemons(limit, offset) {
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
    .then((res) => console.log('Response from server', res))
    .then((res) => {
        console.log(res)
        return res
    });

}
