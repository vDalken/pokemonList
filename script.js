const pokemons = document.getElementById('pokemons');
const pokemonName = document.getElementById('pokemon-name');
const pokemonImg = document.getElementById('pokemon-img');
const pokemonHp =  document.getElementById('hp');
const pokemonAttack = document.getElementById('attack');
const pokemonDefense = document.getElementById('defense');
const pokemonSpecialAttack = document.getElementById('special-attack');
const pokemonSpecialDefense = document.getElementById('special-defense');
const pokemonSpeed = document.getElementById('speed');
const pokemonHeight = document.getElementById('height');
const pokemonWeight = document.getElementById('weight');
const pokemonAbility = document.getElementById('ability');
const pokemonHiddenAbility = document.getElementById('hidden-ability');
const content = document.getElementById('content');

pokemons.addEventListener('change', (event) =>{
    const selectedPokemon = event.target.value;//working
    loadPokemonData(selectedPokemon);
});

window.addEventListener('load', () =>{
    loadPokemonData("pikachu");
});

function loadPokemonData(selectedPokemon) {
    const pokemonData = getPokemonJson(selectedPokemon);
    pokemonData.then(data =>{
        setStyle(data);
        pokemonName.innerText = capitalizeFirstLetter(data.name);
        const {sprites: {other:{ dream_world: {front_default}}}}=  data; 
        pokemonImg.src = front_default;
        pokemonHp.innerText = data.stats[0].base_stat;
        pokemonAttack.innerText = data.stats[1].base_stat;
        pokemonDefense.innerText = data.stats[2].base_stat;
        pokemonSpecialAttack.innerText = data.stats[3].base_stat;
        pokemonSpecialDefense.innerText = data.stats[4].base_stat;
        pokemonSpeed.innerText = data.stats[5].base_stat + `m/s`;
        pokemonHeight.innerText = data.height + ` feets`;
        pokemonWeight.innerText = data.weight + ` pounds`;
        pokemonAbility.innerText = capitalizeFirstLetter(data.abilities[0].ability.name);
        pokemonHiddenAbility.innerText = capitalizeFirstLetter(data.abilities[1].ability.name);
    });
}

function setStyle(data){
    resetBackground();
    switch(data.name){
        case "pikachu":
            content.classList.add('pikachu');
            break;
        case "charizard":
            content.classList.add('charizard');
            break;    
        case "blastoise":
            content.classList.add('blastoise'); 
            break;
        case "flareon":
            content.classList.add('flareon');       
            break;
        case "bulbasaur":
            content.classList.add('bulbasaur');
            break;
        case "gengar":
            content.classList.add('gengar');
            break;
        case "alakazam":
            content.classList.add('alakazam');            
    }
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function resetBackground(){
    content.classList.remove('pikachu');
    content.classList.remove('charizard');
    content.classList.remove('blastoise');
    content.classList.remove('flareon');
    content.classList.remove('bulbasaur');
    content.classList.remove('gengar');
    content.classList.remove('alakazam');
}

async function getPokemonJson(selectedPokemon){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`);
        const pokemonData = await response.json();
        return pokemonData;
    }catch(error){
        console.log(error);
    }
}