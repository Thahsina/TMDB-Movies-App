const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e39717444a9432092fe05ee1376b4fbb&page=1'
const IMG_PATH ='https://image.tmdb.org/t/p/w1280'
const SEARCH_URL ='https://api.themoviedb.org/3/search/movie?api_key=e39717444a9432092fe05ee1376b4fbb&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL)

async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)

    // console.log(data.results);
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTitle = search.value

    if (searchTitle && searchTitle !== ''){
        getMovies(SEARCH_URL + searchTitle)

        search.value = ''
    }
    else {
        window.location.reload()
    }
})

function showMovies(movies){
    //movies is data fetched from API
    main.innerHTML= ''

    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview} = movie
        //this destructuring of object movie we got from the api. the title, poster_path,vote_average etc are exact same keys which our api provides.we need to use these same keys to get its corresponding values from api and add it our movies div called moviesEl.

        const moviesEl = document.createElement('div')
        // movies div created dynamically which currently at this point is empty.
        moviesEl.classList.add('movie')
        //<div class='movie'></div> 

        moviesEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByVote(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `

        //creating the div is DONE here 
        // now we need to put this in DOM 

        main.appendChild(moviesEl)

    })
}


function getClassByVote(vote) {
    if (vote >= 8){
        return 'green'

    }
    
    else if (vote >= 5) {
        return 'orange'
    }
    
    else{
        return 'red'
    }
    
}