$(document).ready(function() {
  let url = "https://api.giphy.com/v1/gifs/search?api_key=CTnSxefMIGBG1JxWvBr6zVvKSLu7FQAw&q=tease&limit=25&offset=0&rating=PG&lang=en"
  let savedSearch = {}
  $('#initial').hide('slow/400/fast', function() {});
  $('#picker').show('slow/400/fast', function() {});
  // $('#story').hide('slow/400/fast', function() {});
  // $("#image")[0].href = "";
  console.log($('#pickerRow'));
  for (var i = 0; i < 12; i++) {
    builderPickerLayout();
  }



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

  function builderPickerLayout() {
    // let newGifsSet = document.createElement("div")
    // newGifsSet.classList.add('container')
    // newGifsSet.classList.add('col-xl-3')
    // newGifsSet.classList.add('justify-content-center')

    let newiframe = document.createElement("iframe")
    newiframe.setAttribute('src', 'https://giphy.com/embed/Q7Eezvahu2Hrq');
    newiframe.setAttribute('width', '341');
    newiframe.setAttribute('height', '480');
    newiframe.setAttribute('frameBorder', '0');
    newiframe.classList.add('giphy-embed')
    newiframe.classList.add('justify-content-center')
    newiframe.classList.add('col-xl-3')

    // console.log("newGifsSet = " + newGifsSet);
    console.log("newiframe = " + newiframe);

    // newGifsSet.append(newiframe)
    $('#pickerRow').append(newiframe)

  }

  if (localStorage.getItem("saved") !== null) {
    console.log("save exists");

    savedSearch = JSON.parse(localStorage.getItem("saved"))
    console.log(savedSearch);
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