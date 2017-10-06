function ytSearch(search) {
  var ytVids = [];//will hold videos later
  var ytapikey = "AIzaSyB0WhHsY5aNb5nP0FA-KmWW7baChjnkK_I";
  console.log(search);
  var ytqueryURL = "https://www.googleapis.com/youtube/v3/search?q=" + search + "&key=" + ytapikey + "&part=snippet&type=video"
  //google api link + search term + api key + snippet parameter + video only
  $.ajax({
    url: ytqueryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response.items)
    for (var i = 0; i < 3; i++) {
      ytVids.push("https://www.youtube.com/watch?v=" + response.items[i].id.videoId);
    }
    console.log(ytVids);
  })
  return ytVids;//returns array of 3 strings of video links
}

ytSearch("porter robinson");
ytSearch("madeon");