
$("#find-artists").on("click", function(){
  var artistSearch = $(".form-control").val();
  var queryURL = "https://cors-anywhere.herokuapp.com/http://musicovery.com/api/V4/artist.php?fct=search&artistname=" + artistSearch + "&format=json"
  console.log(artistSearch)
var simArtist;
var similarURL;
$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response){
  console.log(response)
  console.log(typeof response)
  simArtist = JSON.parse(response).root.artists.artist.mbid;
  var ArtistName = JSON.parse(response).root.artists.artist.name;
  console.log(simArtist)

  similarURL = "https://cors-anywhere.herokuapp.com/http://musicovery.com/api/V4/artist.php?fct=getsimilar&id=" + simArtist + "&resultsnumber=3&format=json"
  $("#artist-info").html("<p>" + ArtistName + "</p>")
  callit();
})
 function callit() {
  $.ajax({
    url: similarURL,
    method: "GET"
  }).done(function(newResponse){
    console.log(newResponse)
    for (var i = 0; i < 3; i++) {
     var simName = JSON.parse(newResponse).root.artists.artist[i].name
    $("#similar-artist-info").append("<p>" + simName + "</p>")
  }
  })
}
})
// run an intial search
//pull unique artist id, store it as a variable
// take variable and plug into similar artist url search
// id="searches" push to artist search


