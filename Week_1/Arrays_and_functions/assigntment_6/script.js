const movies = [];

const movieAmount = Number(prompt("How many movies would u like to rate: "));

for(let i = 0; i < movieAmount; i++){
    const movieTitle = prompt("Enter movies title: ");
    const movieRating = Number(prompt("Enter your rating 1-5: "));

    movies.push({
        title: movieTitle,
        rating: movieRating
    });
}

movies.sort(function(a, b){
    return b.rating-a.rating
})

let output = "";
const bestMovie = movies[0];

movies.forEach(function(movie){
    output += "Movie title: " + movie.title + " Movie rating: " + movie.rating + "<br>";
})
output += "<br>Highest rated movie: " + bestMovie.title + " Rating: " + bestMovie.rating


document.getElementById("result").innerHTML = output