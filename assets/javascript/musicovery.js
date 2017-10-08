
$("#find-artists").on("click", function(){
  $("#artist-info").empty();
  $("#similar-artist-info").empty();
  var artistSearch = $(".form-control").val().trim();
  var queryURL = "https://cors-anywhere.herokuapp.com/http://musicovery.com/api/V4/artist.php?fct=search&artistname=" + artistSearch + "&format=json"
  console.log(artistSearch)
var simArtist;
var similarURL;


var similarMbid = [];
var similarName = [];


$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response){
  console.log(response)
  console.log(typeof response)
  simArtist = JSON.parse(response).root.artists.artist.mbid;
  var artistName = JSON.parse(response).root.artists.artist.name;
  console.log(simArtist)
  var numSimArtist = $("#similar-output").val().trim();
  similarURL = "https://cors-anywhere.herokuapp.com/http://musicovery.com/api/V4/artist.php?fct=getsimilar&id=" + simArtist + "&resultsnumber=3&format=json"
  var artistGenre = JSON.parse(response).root.artists.artist.genre;
  var artistCountry = JSON.parse(response).root.artists.artist.country;
  var genre = $("<p>").addClass("genre-class").append("Genre: " + artistGenre);
  var country = $("<p>").addClass("country-class").append("Country: " + artistCountry);
  console.log(genre)
  console.log(country)
  $("#artist-info").addClass("col-md-3");
  $("#artist-info").append("<h3>" + artistName + "</h3>");
  $("#artist-info").append(genre);
  $("#artist-info").append(country);
  callit();

})
 function callit() {
  $.ajax({
    url: similarURL,
    method: "GET"
  }).done(function(newResponse){
    // numSimArtist = $("#similar-output").val().trim();
    // numSimArtist = parseInt(numSimArtist)
    // console.log(numSimArtist)
    console.log(newResponse)
    for (var i = 0; i < 3; i++) {
     var simName = JSON.parse(newResponse).root.artists.artist[i].name;
     console.log(simName)
     var simMbid = JSON.parse(newResponse).root.artists.artist[i].mbid;
     console.log(simMbid)

     similarMbid.push(simMbid);
     similarName.push(simName);

    // console.log(similarMbid);
    // console.log(similarName);

     artistGenre = JSON.parse(newResponse).root.artists.artist[i].genre;
     artistCountry = JSON.parse(newResponse).root.artists.artist[i].country;
     var simGenre = $("<p>").addClass("genre-class").append("Genre: " + artistGenre);
     var simCountry = $("<p>").addClass("country-class").append("Country: " + artistCountry);
    $("#similar-artist-info").addClass("col-md-3");
    $("#similar-artist-info").append("<h3>" + simName + "</h3>");
    $("#similar-artist-info").append(simGenre);
    $("#similar-artist-info").append(simCountry);
  }
  })
}

  console.log(similarMbid);
  console.log(similarName);


})
// run an intial search
//pull unique artist id, store it as a variable
// take variable and plug into similar artist url search
// id="searches" push to artist search


