// https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0
function request(nivel) {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`)
        .then(response=>response.json())
        .then(results => {
            const pokemons = results.results
            const random = Math.floor(Math.random() * nivel)
            var name = pokemons[random].name
                fetch('https://pokeapi.co/api/v2/pokemon/' + name)
                    .then(response => response.json())
                    .then(result => {
                        const imgElement = document.querySelector('.body_img_pokemon')
                        const img = result.sprites.other.home.front_default
                        imgElement.setAttribute('src', img)
                        localStorage.setItem('pokemon', name);
                    })
        })
}

function verifyPokemon(name, points) {
    const nameInput = document.querySelector('#namePokemon').value.toLowerCase()
    if (name === nameInput) {
        document.querySelector('.body_img_pokemon').classList.add('ok')
        document.querySelector('.body_section').setAttribute('data-ok', points)
        setTimeout(() => {
            request(10)
            document.querySelector('.body_img_pokemon').classList.remove('ok')
            document.querySelector('#namePokemon').value = ''

            points ++
        }, 5000)
    } else {
        document.querySelector('.body_img_pokemon').classList.add('erro')
        setTimeout(() => {
            document.querySelector('.body_img_pokemon').classList.remove('erro')
        }, 210)
    }
}


const points = 01


const button = document.querySelector('button')
button.addEventListener('click', () => {
    verifyPokemon(localStorage.getItem('pokemon'), points)
})

console.log(localStorage.getItem('pokemon'));
document.addEventListener("DOMContentLoaded", request(10));