function rateMovies() {
  var movieAnchorTags = $("div.ml-item a");

  for(var i=0; i< movieAnchorTags.length; i++) {
    var movieAnchorTag = movieAnchorTags[i].outerHTML;
    var movieName = getMovieNameFromAnchorTag(movieAnchorTag);
    var movieYear = getMovieYearFromAnchorTag(movieAnchorTag);

    addMovieRating(movieName, movieYear, i);
  }
}

function getMovieNameFromAnchorTag(movieAnchorTag) {
  var matchResults = movieAnchorTag.match("<b><i>(.*)</i></b>");
  var movieName = matchResults[1].split('(')[0];

  return movieName;
}

function getMovieYearFromAnchorTag(movieAnchorTag) {
  var matchResults = movieAnchorTag.match(/\<b\>\<i\>[\w+\s]* \((\d+)\)\<\/i\>\<\/b\>/);
  var movieYear = (matchResults? matchResults[1] : null);

  return movieYear;
}

function addMovieRating(movieName, movieYear, index) {
  var API = "http://www.omdbapi.com/";
  var URL = API + "?t=" + encodeURIComponent(movieName) + (movieYear? "&y=" + movieYear : "");

  $.getJSON(URL, function(response) {
    if (response.Response === "False") { var rating = "N/A"; }
    else { var rating = response["imdbRating"]; }

    $("span.mli-info:eq(" + index + ") h2").after("<h2>Rating: " + rating + "</h2>");

  });
}

rateMovies();
