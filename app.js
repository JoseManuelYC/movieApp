const container = document.querySelector(".container");
const movieNameRef = document.getElementById("movie-input");
const searchButton = document.getElementById("search-btn");

const movieDetails = document.querySelector(".movie-details");

const getmovie = () => {
  let movieName = movieNameRef.value;
  let url = `https://www.omdbapi.com/?t=${movieName}&apikey=f3897959`;
  if (movieName.length <= 0) {
    return (movieDetails.innerHTML = `<h3>Escribe una pelicula</h3>`);
  } else {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response == "True") {
          movieDetails.innerHTML = `
          <div class="info">
                 <img src="${data.Poster}" class="poster"/>
              <div>
                    <h4>${data.Title} (${data.Year})</h4>
                <div class="rating">
                      <h4>${data.imdbRating}<img src="./img/star.svg" /></h4>
                </div>
                <div class="details">
                    <span>Rated:${data.Rated}</span>
                    <span>Released: ${data.Released}</span>
                </div>
                <div class="genre">
                  <div>${data.Genre.split(",").join("</div><div>")}</div>
                </div>
              </div>
            </div>

                <h3>Plot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</P>
                
                `;
        } else {
          movieDetails.innerHTML = `
          <div class="msg-error">
          <h4>${data.Error}</h4>
          </div>`;
        }
      })
      .catch(() => {
        movieDetails.innerHTML = `<h3>Server Problem</h3>`;
      });
  }
};

searchButton.addEventListener("click", getmovie);
window.addEventListener("load", getmovie);
