var config = {
  apiKey: "AIzaSyDutKB5-pO3S0vsKPmUCfeL6V5KT1hRzNg",
  authDomain: "test-music-4083a.firebaseapp.com",
  databaseURL: "https://test-music-4083a.firebaseio.com",
  projectId: "test-music-4083a",
  storageBucket: "",
  messagingSenderId: "193987209813"
};
firebase.initializeApp(config);
var database = firebase.database();

var intervalId;

$("#searches").hide();
$("#find-artists").hide();

var login;
$("#loginbutton").on("click", function() {
  login = $("#loginname").val().trim();
  console.log(login);
  $("#loginname").hide();
  $("#loginbutton").hide();
  $("#searches").show();
  $("#find-artists").show();
  updateHistory();
})

function updateHistory() {
  $("#history").empty();
  database.ref(login).limitToLast(10).on("child_added", function(snapshot) {
    var history = snapshot.val().search;
    var newButton = $("<button>").text(history);
    newButton.attr("class", "list-group-item rendered")
    newButton.attr("data-name", history)
    $("#history").prepend(newButton);
  })
}

$("#history").on("click", ".rendered", function() {
  var artist = $(this).attr("data-name");
  $("#artist-info").empty();
  $("#similar-artist-info").empty();
  $(".clear").empty();
  getArtist(artist);
})

var artistId;
var similarURL;
var similarMbid = [];
var similarName = [];

function getSimilar() {
  console.log(artistId);
  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/http://musicovery.com/api/V4/artist.php?fct=getsimilar&id=" + artistId + "&apikey=3lqa89g1&resultsnumber=3&format=json",
    method: "GET"
  }).done(function(response) {
    // for (var i = 0; i < 1; i++) {
      var name0 = JSON.parse(response).root.artists.artist[0].name;
      var mbid = JSON.parse(response).root.artists.artist[0].mbid;
      similarMbid.push(mbid);
      similarName.push(name);

      var responseGenre = JSON.parse(response).root.artists.artist[0].genre;
      var responseCountry = JSON.parse(response).root.artists.artist[0].country;
      var genre = $("<p>").addClass("genre-class").append("Genre: " + responseGenre);
      var country = $("<p>").addClass("country-class").append("Country: " + responseCountry);
      $("#similar-artist-info0").addClass("col-md-3");
      $("#similar-artist-info0").append("<h3>" + name0 + "</h3>");
      $("#similar-artist-info0").append(genre);
      $("#similar-artist-info0").append(country);
      ytSearch0(name0);
     
      var name1 = JSON.parse(response).root.artists.artist[1].name;
      var mbid = JSON.parse(response).root.artists.artist[1].mbid;
      similarMbid.push(mbid);
      similarName.push(name);

      var responseGenre = JSON.parse(response).root.artists.artist[1].genre;
      var responseCountry = JSON.parse(response).root.artists.artist[1].country;
      var genre = $("<p>").addClass("genre-class").append("Genre: " + responseGenre);
      var country = $("<p>").addClass("country-class").append("Country: " + responseCountry);
      $("#similar-artist-info1").addClass("col-md-3");
      $("#similar-artist-info1").append("<h3>" + name1 + "</h3>");
      $("#similar-artist-info1").append(genre);
      $("#similar-artist-info1").append(country);
      ytSearch1(name1);

      var name2 = JSON.parse(response).root.artists.artist[2].name;
      var mbid = JSON.parse(response).root.artists.artist[2].mbid;
      similarMbid.push(mbid);
      similarName.push(name);

      var responseGenre = JSON.parse(response).root.artists.artist[2].genre;
      var responseCountry = JSON.parse(response).root.artists.artist[2].country;
      var genre = $("<p>").addClass("genre-class").append("Genre: " + responseGenre);
      var country = $("<p>").addClass("country-class").append("Country: " + responseCountry);
      $("#similar-artist-info2").addClass("col-md-3");
      $("#similar-artist-info2").append("<h3>" + name2 + "</h3>");
      $("#similar-artist-info2").append(genre);
      $("#similar-artist-info2").append(country);
      ytSearch2(name2);
    // }
  })
}

function getArtist(name) {
  var queryURL = "https://cors-anywhere.herokuapp.com/http://musicovery.com/api/V4/artist.php?fct=search&artistname=" + name + "&apikey=3lqa89g1&format=json"
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
    intervalId = setTimeout(getSimilar, 1001);
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
       var videoLink = "https://www.youtube.com/embed/" + response.items[0].id.videoId + '?&theme=dark&autohide=2&modestbranding=1&fs=0&showinfo=0&iv_load_policy=3"frameborder="0';
       var newYT = $("<iframe>").attr("src", videoLink);
       // var framez = $("#YT" + i).addClass("framez" + i);
       $("#artist-info").append(newYT);
  })
}
function ytSearch0(search) {
  var ytapikey = "AIzaSyB0WhHsY5aNb5nP0FA-KmWW7baChjnkK_I";
  console.log(search);
  var ytqueryURL = "https://www.googleapis.com/youtube/v3/search?q=" + search + "&key=" + ytapikey + "&part=snippet&type=video"
  $.ajax({
    url: ytqueryURL,
    method: "GET"
  }).done(function(response) {
   for (var i = 0; i < 3; i++) {
       var videoLink = "https://www.youtube.com/embed/" + response.items[i].id.videoId + '?&theme=dark&autohide=2&modestbranding=1&fs=0&showinfo=0&iv_load_policy=3"frameborder="0';
       var newYT = $("<iframe>").attr("src", videoLink);
       // var framez = $("#YT" + i).addClass("framez" + i);
       $("#YT0").append(newYT);
     }
  console.log("https://www.youtube.com/watch?v=" + response.items[0].id.videoId);
  })
}
function ytSearch1(search) {
  var ytapikey = "AIzaSyB0WhHsY5aNb5nP0FA-KmWW7baChjnkK_I";
  console.log(search);
  var ytqueryURL = "https://www.googleapis.com/youtube/v3/search?q=" + search + "&key=" + ytapikey + "&part=snippet&type=video"
  $.ajax({
    url: ytqueryURL,
    method: "GET"
  }).done(function(response) {
   for (var i = 0; i < 3; i++) {
       var videoLink = "https://www.youtube.com/embed/" + response.items[i].id.videoId + '?&theme=dark&autohide=2&modestbranding=1&fs=0&showinfo=0&iv_load_policy=3"frameborder="0';
       var newYT = $("<iframe>").attr("src", videoLink);
       // var framez = $("#YT" + i).addClass("framez" + i);
       $("#YT1").append(newYT);
     }
  console.log("https://www.youtube.com/watch?v=" + response.items[0].id.videoId);
  })
}
function ytSearch2(search) {
  var ytapikey = "AIzaSyB0WhHsY5aNb5nP0FA-KmWW7baChjnkK_I";
  console.log(search);
  var ytqueryURL = "https://www.googleapis.com/youtube/v3/search?q=" + search + "&key=" + ytapikey + "&part=snippet&type=video"
  $.ajax({
    url: ytqueryURL,
    method: "GET"
  }).done(function(response) {
   for (var i = 0; i < 3; i++) {
       var videoLink = "https://www.youtube.com/embed/" + response.items[i].id.videoId + '?&theme=dark&autohide=2&modestbranding=1&fs=0&showinfo=0&iv_load_policy=3"frameborder="0';
       var newYT = $("<iframe>").attr("src", videoLink);
       // var framez = $("#YT" + i).addClass("framez" + i);
       $("#YT2").append(newYT);
     }
  console.log("https://www.youtube.com/watch?v=" + response.items[0].id.videoId);
  })
}

$("#find-artists").on("click", function(){
  $("#artist-info").empty();
  $("#similar-artist-info").empty();
  var artist = $("#searches").val().trim();
  database.ref(login).push({
    search: artist
  })
  $(".clear").empty();
  getArtist(artist);
});
