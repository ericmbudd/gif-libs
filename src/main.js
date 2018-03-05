$(document).ready(function() {
  let url = "https://api.giphy.com/v1/gifs/search?api_key=CTnSxefMIGBG1JxWvBr6zVvKSLu7FQAw&q=tease&limit=25&offset=0&rating=PG&lang=en"
  let savedSearch = {}
  // $('#initial').hide('slow/400/fast', function() {});
  // $('#picker').show('slow/400/fast', function() {});
  // $('#story').hide('slow/400/fast', function() {});
  // $("#image")[0].href = "";


  function togglePicker() {
    $('#initial').fadeOut('500', function() {});
    setTimeout(function() {
      $('#picker').fadeIn('500', function() {});
    }, 500);
  }

  function toggleStory() {
    $('#picker').fadeOut('500', function() {});
    setTimeout(function() {
      $('#story').fadeIn('500', function() {});
    }, 500);
  }

  if (localStorage.getItem("saved") !== null) {
    console.log("save exists");

    savedSearch = JSON.parse(localStorage.getItem("saved"))
    console.log(savedSearch);
    console.log(document);
    console.log($("#image"));
  } else {
    console.log("no save");
    $.getJSON(url, function(data) {
      // console.log(data);
      localStorage.setItem("saved", JSON.stringify(data))
    });
  }

  $('#create').click(togglePicker)
  $('#picker').click(toggleStory)
});