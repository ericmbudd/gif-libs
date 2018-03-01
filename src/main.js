$(document).ready(function() {
  let url = "https://api.giphy.com/v1/gifs/search?api_key=CTnSxefMIGBG1JxWvBr6zVvKSLu7FQAw&q=tease&limit=25&offset=0&rating=PG&lang=en"
  let savedSearch = {}

  if (localStorage.getItem("saved") !== null) {
    console.log("save exists");

    savedSearch = JSON.parse(localStorage.getItem("saved"))
    console.log(savedSearch);
  } else {
    console.log("no save");
    $.getJSON(url, function(data) {
      //console.log(data);
      localStorage.setItem("saved", JSON.stringify(data))
    });
  }

});