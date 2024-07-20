const movieTitleInput = document.getElementById("movie-title")
const submitSearchBtn = document.getElementById("search-button")
const movieResultContainer = document.getElementById("movie-result-container")
const movieWatchlistContainer = document.getElementById(
	"movie-watchlist-container"
)
const addToWatchlistEl = document.getElementById("add-to-watchlist")
const removeToWatchlistEl = document.getElementById("remove-from-watchlist")

const keyApi = "63dfefb3"
let movieTitle = "blade"

let imdbIdArray = []
let movieArray = []
let myLocalStorage = JSON.parse(localStorage.getItem("movie-watch-list")) || []

async function renderMovieListLocalStorage() {
	let html = ""

	myLocalStorage.forEach((movie) => {
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
							<div id="remove-from-watchlist">
	                        	<button data-remove-movie-id=${movie.imdbID}>
									<i class="fa-solid fa-circle-minus"></i>
									Remove
								</button>
							</div>
	                    </div>
	                    <p id="plot">
	                        ${movie.Plot}
	                    </p>
	                </div>
	            </div>
	        </li>
	    `
	})
	movieWatchlistContainer.innerHTML = html
}
// localStorage.clear()

renderMovieListLocalStorage()

submitSearchBtn.addEventListener("click", fetchByMovieTitle)

document.addEventListener("click", function (e) {
	if (e.target.dataset.addMovieId) {
		pushMovieToLocalStorage(e.target.dataset.addMovieId)
	} else if (e.target.dataset.removeMovieId) {
		removeMovieToLocalStorage(e.target.dataset.removeMovieId)
		// console.log(e.target.dataset.removeMovieId)
	}
})

function removeMovieToLocalStorage(movieId) {
	// const filteredMovie = myLocalStorage((id) => id.imdbID !== movieId)
	console.log(movieId)
}

function pushMovieToLocalStorage(movieId) {
	const filteredMovie = movieArray.filter((id) => id.imdbID === movieId)
	myLocalStorage.push(filteredMovie[0])
	localStorage.setItem("movie-watch-list", JSON.stringify(myLocalStorage))
	// addToWatchlistEl.innerHTML = `
	//     <p>Added to movielist!</p>
	// `
}

async function fetchByMovieTitle() {
	imdbIdArray = []
	const movieTitle = movieTitleInput.value
	const res = await fetch(
		`http://www.omdbapi.com/?apikey=${keyApi}&s=${movieTitle}`
	)
	const data = await res.json()
	data.Search.forEach((id) => imdbIdArray.push(id.imdbID))
	fetchByImdbTitle()
	movieTitleInput.value = ""
}

async function fetchByImdbTitle() {
	movieArray = []
	for (let id of imdbIdArray) {
		const res = await fetch(`http://www.omdbapi.com/?apikey=${keyApi}&i=${id}`)
		const data = await res.json()
		movieArray.push(data)
	}
	renderMovieList(movieArray)
}

async function renderMovieList(movie) {
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
                            <div id="add-to-watchlist">
                                <button data-add-movie-id=${movie.imdbID}>
                                    <i class="fa-solid fa-circle-plus"></i>
                                    Watchlist
                                </button>
                            </div>
	                    </div>
	                    <p id="plot">
	                        ${movie.Plot}
	                    </p>
	                </div>
	            </div>
	        </li>
	    `
	})

	movieResultContainer.innerHTML = html
}
