  var config = {
    apiKey: "AIzaSyBZ8sRlcmt39GEWn6r35ZQoWXVs2CMgHDE",
    authDomain: "find-you-music.firebaseapp.com",
    databaseURL: "https://find-you-music.firebaseio.com",
    projectId: "find-you-music",
    storageBucket: "find-you-music.appspot.com",
    messagingSenderId: "1098210242637"
  };
  firebase.initializeApp(config);
  var database = firebase.database();


$("#find-artists").on("click", function(){
  $("#artist-info").empty();
  $("#similar-artist-info").empty();
  $("#searches").empty();
  var artistSearch = $(".form-control").val().trim();
  var queryURL = "https://cors-anywhere.herokuapp.com/http://musicovery.com/api/V4/artist.php?fct=search&artistname=" + artistSearch + "&apikey=3lqa89g1&format=json"
  console.log(artistSearch)
var simArtist;
var similarURL;


var similarMbid = [];
var similarName = [];


$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response){
  login = $("#login-name").val();
  console.log(response)
  console.log(typeof response)
  simArtist = JSON.parse(response).root.artists.artist.mbid;
  var artistName = JSON.parse(response).root.artists.artist.name;
  console.log(simArtist)
  // var numSimArtist = $("#similar-output").val().trim();
  similarURL = "https://cors-anywhere.herokuapp.com/http://musicovery.com/api/V4/artist.php?fct=getsimilar&id=" + simArtist + "&resultsnumber=3&apikey=3lqa89g1&format=json"
  var artistGenre = JSON.parse(response).root.artists.artist.genre;
  var artistCountry = JSON.parse(response).root.artists.artist.country;
  var genre = $("<p>").addClass("genre-class");
  var country = $("<p>").addClass("country-class");
  $("#artist-info").addClass("col-md-3");
  $("#artist-info").append("<h3>" + artistName + "</h3>");
  $("#artist-info").append(genre);
  $("#artist-info").append(country);
  callit();
  var old = database.ref('history');
database.ref('history1').push({
    search: artistName
  })

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
    playlist();
  }
  })
}

  console.log(similarMbid);
  console.log(similarName);
  var playlistAPI = "https://cors-anywhere.herokuapp.com/http://musicovery.com/api/V4/playlist.php?&fct=getfromartist&artistmbid=" + simArtist + "&resultsnumber=5&format=json"

//


for (var i = 1; i <= 3; i++) {

  var loopMbid = similarMbid + "[" + i + "]";
  var relatedPlaylistUrl = "https://cors-anywhere.herokuapp.com/" + "http://musicovery.com/api/playlist.php?fct=artistseed&artistmbid=" + loopMbid + "&popularitymax=100&popularitymin=25&tracksnumber=3";

 function playlist() {// Playlist from artist: make a plalist of 3 songs related to / also including original artist)
    $.ajax({
      url: relatedPlaylistUrl,
      method: "GET"
    }).done(function(playlistResponse){


      console.log(playlistResponse);

      var playlistTrackTitle = JSON.parse(playlistResponse).root.tracks.track[i].title;
      var playlistArtist = JSON.parse(playlistResponse).root.tracks.track[i].artist.name;
      var playlistPic = JSON.parse(playlistResponse).root.tracks.track[i].artist.imgurl;
      
      console.log(playlistTrackTitle)
      console.log(playlistArtist)
      console.log(playlistPic)



})


}
}


})
// run an intial search
//pull unique artist id, store it as a variable
// take variable and plug into similar artist url search
// id="searches" push to artist search
