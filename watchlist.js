const movieWatchlistContainer = document.getElementById(
	"movie-watchlist-container"
)
let moviesLocalStorage = []

document.addEventListener("click", (e) => {
	if (e.target.dataset.removeMovieId) {
		removeFromWatchlist(e.target.dataset.removeMovieId)
	}
})

function getMoviesFromLocalStorage() {
	const moviesFromLocalStorage = JSON.parse(localStorage.getItem("watchlist"))
	moviesLocalStorage = moviesFromLocalStorage
	if (moviesLocalStorage.length) {
		renderMovieList(moviesLocalStorage)
	}
}

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
								 <div>
									<p class="add-to-watchlist" id=${movie.imdbID} data-remove-movie-id=${movie.imdbID}>
										<i class="fa-solid fa-circle-minus"></i>
										Remove
									</p>
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

	renderMovie(html)
}

// renders/injecting the html from the list items to DOM
function renderMovie(html) {
	movieWatchlistContainer.innerHTML = html
	// if (moviesLocalStorage.length === 0) {
	// 	movieWatchlistContainer.innerHTML = `
	// 	<p class="explore-movie-text">
	// 		Your watchlist is looking a little empty...
	// 	</p>
	// 	<div class="add-some-movies">
	// 		<a href="index.html">
	// 			<i class="fa-solid fa-circle-plus"></i>Let’s add some movies!
	// 		</a>
	// 	</div>
	// 	`
	// }
}

function removeFromWatchlist(imdbID) {
	const newMovieArray = moviesLocalStorage.filter((movie) => {
		if (!(movie.imdbID === imdbID)) {
			return movie
		}
	})

	localStorage.setItem("watchlist", JSON.stringify(newMovieArray))
	getMoviesFromLocalStorage()

	if (moviesLocalStorage.length) {
		renderMovieList(moviesLocalStorage)
	} else {
		movieWatchlistContainer.innerHTML = `
		<p class="explore-movie-text">
			Your watchlist is looking a little empty...
		</p>
		<div class="add-some-movies">
			<a href="index.html">
				<i class="fa-solid fa-circle-plus"></i>Let’s add some movies!
			</a>
		</div>
		`
	}
}

getMoviesFromLocalStorage()
