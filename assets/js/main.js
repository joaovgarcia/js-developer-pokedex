//Aqui ficarão as requisições HTTP --> FETCH API uma biblioteca JS imbutida nos Browser 
//No método HTTP há um delay no processamento que chamamos de ASSINCRONO, 
// pois há um intervalo de tempo desde o envio para o servidor e o recebimento da resposta 
// Ou seja, fico por um tempo inderteminado a receber a resposta. Com isso, temos o retorno 
//da função fetch, o  "promisse", que nada mais é do que a resposta que há de vir do servidor 
//posso debugar de uma maneira bem simples apenas selecionando o ponto de depuração no arquivo, pelo browser 
//e também pelo proprio codigo fonte adicionando o debugger //quando o JS for executado e meu devtools estiver aberto, ele vai parar 
//onde o debugger está


const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
	return `
    	<li class="pokemon ${pokemon.type}">
        	<span class="number">#${pokemon.number}</span>
        	<span class="name">${pokemon.name}</span>

        	<div class="detail">
            	<ol class="types">
                	${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            	</ol>

            	<img src="${pokemon.photo}"
                 	alt="${pokemon.name}">
        	</div>
    	</li>
	`
}

function loadPokemonItens(offset, limit) {
	pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    	const newHtml = pokemons.map(convertPokemonToLi).join('')
    	pokemonList.innerHTML += newHtml
	})
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
	offset += limit
	const qtdRecordsWithNexPage = offset + limit

	if (qtdRecordsWithNexPage >= maxRecords) {
    	const newLimit = maxRecords - offset
    	loadPokemonItens(offset, newLimit)

    	loadMoreButton.parentElement.removeChild(loadMoreButton)
	} else {
    	loadPokemonItens(offset, limit)
	}
})



/* const listItems = [] 
pokeApi.getPokemons().then((pokemons = []) => { 
    for (let i = 0; i < pokemons.length; i++) { 
        const pokemon = pokemons[i]; listItems.push(convertPokemonToLi(pokemon)) 
    } 
    
    console.log(listItems) 

})
*/