/* eslint no-restricted-globals: 'off' */


// Iteration 1: All rates average - Get the average of all rates with 2 decimals 
function ratesAverage(array) {
    return Number((array.reduce(function(acu, curr) {
        return acu + curr.rate
    }, 0) / array.length).toFixed(2));
}
 
// Iteration 2: Drama movies - Get the average of Drama Movies
function dramaMoviesRate(array) {
    let dramaMovies = array.filter(function(rate) {
        return rate.genre.indexOf("Drama") != -1
    })
    if (dramaMovies.length == 0) {
        return 0;
    }
    let dramaAverage = ratesAverage(dramaMovies);
    return dramaAverage;
}

// Iteration 3: Ordering by duration - Order by time duration, ascending (in growing order)
function orderByYear(array) {
    return array.sort(function(a, b){
        if (a.year > b.year) return 1;
        if (a.year == b.year && a.title > b.title) return 1;
        if (a.year == b.year && a.title < b.title) return -1;
        if (a.year < b.year) return -1;
    })
}

// Iteration 4: Steven Spielberg. The best? - How many movies did STEVEN SPIELBERG direct
function howManyMovies(array) {
    return array.filter(function(movie){
        return movie.director == 'Steven Spielberg' && movie.genre.indexOf("Drama") != -1 
    }).length
}

// Iteration 5: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(array) {
    return array.sort(function(a,b) {
        if (a.title > b.title) return 1;
        if (a.title == b.title) return 0;
        if (a.title < b.title) return -1; 
    }).slice(0,20).map(function(movie){
        return movie.title
    })
}

// Iteration 6: Time Format - Turn duration of the movies from hours to minutes
function minutesToHours (duration) {
    let arrayDuration = duration.split(" ");
    if (arrayDuration.length == 1) {
        if (arrayDuration[0].indexOf("h") != -1) {
            arrayDuration[0] = +arrayDuration[0].replace("h", "") * 60;
        } else {
            arrayDuration[0] = +arrayDuration[0].replace("min", "");
        }
    } else {
        arrayDuration[0] = +arrayDuration[0].replace("h", "") * 60;
        arrayDuration[1] = +arrayDuration[1].replace("min", "");
    }
    let totalDuration = arrayDuration.reduce(function(acu,curr){
        return +acu + +curr
    }, 0)
    return totalDuration;
}

function turnHoursToMinutes(array) {
    return array.map(function(movie) {
        let copyMovie = Object.assign({},movie);
        copyMovie.duration = minutesToHours(movie.duration)
        return copyMovie
    })
}

// BONUS Iteration: Best yearly rate average - Best yearly rate average
