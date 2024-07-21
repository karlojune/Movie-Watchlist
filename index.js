// const keyApi = "63dfefb3"
const searchInput = document.getElementById("movie-title-input")

let moviesToRender = []
let moviesLocalStorage = []

// Event Listener
document.addEventListener("click", (e) => {
	if (e.target.id === "search-button") {
		fetchMovie()
	} else if (e.target.dataset.addMovieId) {
		addToWatchlist(e.target.dataset.addMovieId)
	}
})

// Fetching Movie Details from API
async function fetchMovie() {
	moviesToRender = []

	const res = await fetch(
		`https://www.omdbapi.com/?apikey=63dfefb3&s=${searchInput.value}`
	)
	const data = await res.json()
	const movieArray = data.Search

	movieArray.forEach(async (id) => {
		const res = await fetch(
			`https://www.omdbapi.com/?apikey=63dfefb3&i=${id.imdbID}`
		)
		const data = await res.json()
		moviesToRender.push(data)
		if (moviesToRender.length === movieArray.length) {
			renderMovieList(moviesToRender)
		}
	})

	searchInput.value = ""
}

// Looping through all the movies and adding them as list items to pass on to render function
function renderMovieList(movie) {
	let html = ""

	movie.forEach((movie) => {
		html += `
	        <li>
	            <div class="movie-container">
	                <img src="${movie.Poster}" alt="" />
	                <div class="movie-detail">
	                    <div class="movie-title">
	                        <p class="title">${movie.Title}</p>
	                        <i class="fa-solid fa-star"></i>
	                        <p class="rating">${movie.imdbRating}</p>
	                    </div>
	                    <div class="movie-runtime">
	                        <p id="runtime">${movie.Runtime}</p>
	                        <p id="genre">${movie.Genre}</p>
							${
								moviesLocalStorage.find((id) => id.imdbID === movie.imdbID)
									? `<p class="in-watchlist">In watchlist</p>`
									: `<div>
									<p class="add-to-watchlist" id=${movie.imdbID} data-add-movie-id=${movie.imdbID}>
										<i class="fa-solid fa-circle-plus"></i>
										Watchlist
									</p>
								</div>`
							}
	                    </div>
	                    <p id="plot">
	                        ${movie.Plot}
	                    </p>
	                </div>
	            </div>
	        </li>
	    `
	})

	renderMovie(html)
}

// renders/injecting the html from the list items to DOM
function renderMovie(html) {
	document.getElementById("movie-result-container").innerHTML = html
}

function addToWatchlist(imdbID) {
	const checkMovie = moviesLocalStorage.find((movie) => movie.imdbID === imdbID)
	if (checkMovie) {
		console.log("already Added to watchlist")
	} else {
		moviesToRender.find((movie) => {
			if (movie.imdbID === imdbID) {
				moviesLocalStorage.push(movie)
				localStorage.setItem("watchlist", JSON.stringify(moviesLocalStorage))
				document.getElementById(movie.imdbID).textContent = `In watchlist`
				document.getElementById(movie.imdbID).classList.add("in-watchlist")
			}
		})
	}
}

function getMoviesFromLocalStorage() {
	let moviesFromLocalStorage = JSON.parse(localStorage.getItem("watchlist"))
	if (moviesFromLocalStorage) {
		moviesLocalStorage = moviesFromLocalStorage
	}
}

getMoviesFromLocalStorage()
