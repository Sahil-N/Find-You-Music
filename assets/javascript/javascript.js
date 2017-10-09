var artistId;
var similarURL;
var similarMbid = [];
var similarName = [];

function getSimilar() {
  console.log(artistId);
  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/http://musicovery.com/api/V4/artist.php?fct=getsimilar&id=" + artistId + "&resultsnumber=3&format=json",
    method: "GET"
  }).done(function(response) {
    for (var i = 0; i < 3; i++) {
      var name = JSON.parse(response).root.artists.artist[i].name;
      var mbid = JSON.parse(response).root.artists.artist[i].mbid;
      similarMbid.push(mbid);
      similarName.push(name);

      var responseGenre = JSON.parse(response).root.artists.artist[i].genre;
      var responseCountry = JSON.parse(response).root.artists.artist[i].country;
      var genre = $("<p>").addClass("genre-class").append("Genre: " + responseGenre);
      var country = $("<p>").addClass("country-class").append("Country: " + responseCountry);
      $("#similar-artist-info").addClass("col-md-3");
      $("#similar-artist-info").append("<h3>" + name + "</h3>");
      $("#similar-artist-info").append(genre);
      $("#similar-artist-info").append(country);
      ytSearch(name);
    }
  })
}

function getArtist(name) {
  var queryURL = "https://cors-anywhere.herokuapp.com/http://musicovery.com/api/V4/artist.php?fct=search&artistname=" + name + "&format=json"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response){
    artistId = JSON.parse(response).root.artists.artist.mbid;
    console.log(artistId);
    var artistName = JSON.parse(response).root.artists.artist.name;
    var artistGenre = JSON.parse(response).root.artists.artist.genre;
    var artistCountry = JSON.parse(response).root.artists.artist.country;
    var genre = $("<p>").addClass("genre-class").append("Genre: " + artistGenre);
    var country = $("<p>").addClass("country-class").append("Country: " + artistCountry);
    $("#artist-info").addClass("col-md-3");
    $("#artist-info").append("<h3>" + artistName + "</h3>");
    $("#artist-info").append(genre);
    $("#artist-info").append(country);
    getSimilar(artistId);
    ytSearch(name);
  })
}

function ytSearch(search) {
  var ytapikey = "AIzaSyB0WhHsY5aNb5nP0FA-KmWW7baChjnkK_I";
  console.log(search);
  var ytqueryURL = "https://www.googleapis.com/youtube/v3/search?q=" + search + "&key=" + ytapikey + "&part=snippet&type=video"
  $.ajax({
    url: ytqueryURL,
    method: "GET"
  }).done(function(response) {
  console.log("https://www.youtube.com/watch?v=" + response.items[0].id.videoId);
  })
}

$("#find-artists").on("click", function(){
  $("#artist-info").empty();
  $("#similar-artist-info").empty();
  var artist = $(".form-control").val().trim();
  getArtist(artist);
});

// var config = {
//   apiKey: "AIzaSyDutKB5-pO3S0vsKPmUCfeL6V5KT1hRzNg",
//   authDomain: "test-music-4083a.firebaseapp.com",
//   databaseURL: "https://test-music-4083a.firebaseio.com",
//   projectId: "test-music-4083a",
//   storageBucket: "",
//   messagingSenderId: "193987209813"
// };
// firebase.initializeApp(config);

// var database = firebase.database();


// ytSearch("porter robinson");

// $("#submit").on("click", function() {
//   event.preventDefault();
//   console.log("button pressed")
//   var artist = $("#artist").val().trim();

//   database.ref().push({
//     artist: artist
//   })
// })

// curl -X "POST" -H "Authorization: Basic ZjM4ZjAw...WY0MzE=" -d grant_type=client_credentials https://accounts.spotify.com/api/token

// $.ajax({
//   url: "https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token",
//   method: "POST",
//   data: '{"grant_type":"client_credentials"}',
//   beforeSend: function(xhr) {
//     xhr.setRequestHeader("Authorization", "Basic OWM0N2RkOTE0MmZkNDQ4MGEzNzcxYmZiMTk1YzEzOTI6MzNjNzI4OGY5NTBkNGUwY2I2N2MzMDZjMjMzMTZjODA=");
//     xhr.setRequestHeader('Accept', "application/json");
//   }
//   // header: {
//   //   'Authorization': 'Basic OWM0N2RkOTE0MmZkNDQ4MGEzNzcxYmZiMTk1YzEzOTI6MzNjNzI4OGY5NTBkNGUwY2I2N2MzMDZjMjMzMTZjODA=',
//   //   'Content-Type': 'application/x-www-form-urlencoded'
//   // },
// }).done(function(response) {
//   console.log(response);
// })