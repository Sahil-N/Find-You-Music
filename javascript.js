$("#searches").hide();
$("#find-artists").hide();

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

var artistId;
var login;

function updateHistory() {
  database.ref(login).limitToLast(10).on("child_added", function(snapshot) {
    var name = snapshot.val().search;
    var newButton = $("<button>").text(name);
    newButton.attr("class", "list-group-item rendered")
    newButton.attr("data-name", name)
    $("#history").prepend(newButton);
  })
}

var ytapikey = "AIzaSyB0WhHsY5aNb5nP0FA-KmWW7baChjnkK_I";

function ytSearch(search) {
  var ytqueryURL = "https://www.googleapis.com/youtube/v3/search?q=" + search + "&key=" + ytapikey + "&part=snippet&type=video"
  $.ajax({
    url: ytqueryURL,
    method: "GET"
  }).done(function(response) {
    var videoLink = "https://www.youtube.com/embed/" + response.items[0].id.videoId + '?&theme=dark&autohide=2&modestbranding=1&fs=0&showinfo=0&iv_load_policy=3"frameborder="0';
    var newYT = $("<iframe>").attr("src", videoLink);
    $("#artist-info").append(newYT);
  })
}

function ytSearch0(search) {
  var ytqueryURL = "https://www.googleapis.com/youtube/v3/search?q=" + search + "&key=" + ytapikey + "&part=snippet&type=video"
  $.ajax({
    url: ytqueryURL,
    method: "GET"
  }).done(function(response) {
    for (var i = 0; i < 3; i++) {
      var videoLink = "https://www.youtube.com/embed/" + response.items[i].id.videoId + '?&theme=dark&autohide=2&modestbranding=1&fs=0&showinfo=0&iv_load_policy=3"frameborder="0';
      var newYT = $("<iframe>").attr("src", videoLink);
      $("#YT0").append(newYT);
    }
  })
}

function ytSearch1(search) {
  var ytqueryURL = "https://www.googleapis.com/youtube/v3/search?q=" + search + "&key=" + ytapikey + "&part=snippet&type=video"
  $.ajax({
    url: ytqueryURL,
    method: "GET"
  }).done(function(response) {
    for (var i = 0; i < 3; i++) {
      var videoLink = "https://www.youtube.com/embed/" + response.items[i].id.videoId + '?&theme=dark&autohide=2&modestbranding=1&fs=0&showinfo=0&iv_load_policy=3"frameborder="0';
      var newYT = $("<iframe>").attr("src", videoLink);
      $("#YT1").append(newYT);
    }
  })
}

function ytSearch2(search) {
  var ytqueryURL = "https://www.googleapis.com/youtube/v3/search?q=" + search + "&key=" + ytapikey + "&part=snippet&type=video"
  $.ajax({
    url: ytqueryURL,
    method: "GET"
  }).done(function(response) {
    for (var i = 0; i < 3; i++) {
      var videoLink = "https://www.youtube.com/embed/" + response.items[i].id.videoId + '?&theme=dark&autohide=2&modestbranding=1&fs=0&showinfo=0&iv_load_policy=3"frameborder="0';
      var newYT = $("<iframe>").attr("src", videoLink);
      $("#YT2").append(newYT);
    }
  })
}

function getSimilar() {
  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/http://musicovery.com/api/V4/artist.php?fct=getsimilar&id=" + artistId + "&apikey=3lqa89g1&resultsnumber=3&format=json",
    method: "GET"
  }).done(function(response) {
    var name0 = JSON.parse(response).root.artists.artist[0].name;
    var mbid = JSON.parse(response).root.artists.artist[0].mbid;

    var responseGenre = JSON.parse(response).root.artists.artist[0].genre;
    var responseCountry = JSON.parse(response).root.artists.artist[0].country;
    var genre = $("<p>").addClass("genre-class").append("Genre: " + responseGenre);
    var country = $("<p>").addClass("country-class").append("Country: " + responseCountry);
    $("#similar-artist-info0").addClass("col-md-3");
    $("#similar-artist-info0").append("<h3>" + name0 + "</h3>", genre, country);
    ytSearch0(name0);
     
    var name1 = JSON.parse(response).root.artists.artist[1].name;
    var mbid = JSON.parse(response).root.artists.artist[1].mbid;

    var responseGenre = JSON.parse(response).root.artists.artist[1].genre;
    var responseCountry = JSON.parse(response).root.artists.artist[1].country;
    var genre = $("<p>").addClass("genre-class").append("Genre: " + responseGenre);
    var country = $("<p>").addClass("country-class").append("Country: " + responseCountry);
    $("#similar-artist-info1").addClass("col-md-3");
    $("#similar-artist-info1").append("<h3>" + name1 + "</h3>", genre, country);
    ytSearch1(name1);

    var name2 = JSON.parse(response).root.artists.artist[2].name;
    var mbid = JSON.parse(response).root.artists.artist[2].mbid;

    var responseGenre = JSON.parse(response).root.artists.artist[2].genre;
    var responseCountry = JSON.parse(response).root.artists.artist[2].country;
    var genre = $("<p>").addClass("genre-class").append("Genre: " + responseGenre);
    var country = $("<p>").addClass("country-class").append("Country: " + responseCountry);
    $("#similar-artist-info2").addClass("col-md-3");
    $("#similar-artist-info2").append("<h3>" + name2 + "</h3>", genre, country);
    ytSearch2(name2);
  })
}

function getArtist(name) {
  var queryURL = "https://cors-anywhere.herokuapp.com/http://musicovery.com/api/V4/artist.php?fct=search&artistname=" + name + "&apikey=3lqa89g1&format=json"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response){
    artistId = JSON.parse(response).root.artists.artist.mbid;
    var artistName = JSON.parse(response).root.artists.artist.name;
    var artistGenre = JSON.parse(response).root.artists.artist.genre;
    var artistCountry = JSON.parse(response).root.artists.artist.country;
    var genre = $("<p>").addClass("genre-class").append("Genre: " + artistGenre);
    var country = $("<p>").addClass("country-class").append("Country: " + artistCountry);
    $("#artist-info").addClass("col-md-3");
    $("#artist-info").append("<h3>" + artistName + "</h3>", genre, country);
    setTimeout(getSimilar, 1001);
    ytSearch(name);
  })
}

function clearStuff() {
  $("#artist-info").empty();
  $("#similar-artist-info").empty();
  $(".clear").empty();
  $("#YT0").empty();
  $("#YT1").empty();
  $("#YT2").empty();
}

$("#loginbutton").on("click", function() {
  login = $("#loginname").val().trim();
  $("#loginname").hide();
  $("#loginbutton").hide();
  $("#searches").show();
  $("#find-artists").show();
  updateHistory();
})

$("#history").on("click", ".rendered", function() {
  clearStuff();
  var artist = $(this).attr("data-name");
  getArtist(artist);
})

$("#find-artists").on("click", function(){
  if ($("#searches").val() !== "") {
    clearStuff();
    var artist = $("#searches").val().trim();
    database.ref(login).push({
      search: artist
    })
    getArtist(artist);
    $("#searches").val("");
  }
});
