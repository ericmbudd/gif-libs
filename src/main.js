$(document).ready(function() {
  let url = "https://api.giphy.com/v1/gifs/search?api_key=CTnSxefMIGBG1JxWvBr6zVvKSLu7FQAw&q=knight&limit=25&offset=0&rating=PG&lang=en"
  let savedSearch = {}
  // $('#initial').hide('slow/400/fast', function() {});
  // $('#picker').show('slow/400/fast', function() {});
  // $('#story').hide('slow/400/fast', function() {});
  // $("#image")[0].href = "";
  console.log($('#pickerRow'));

  if (localStorage.getItem("saved") !== null) {
    console.log("save exists");

    savedSearch = JSON.parse(localStorage.getItem("saved"))
    console.log(savedSearch);
  } else {
    console.log("no save");
    $.getJSON(url, function(data) {
      // console.log(data);
      savedSearch = data;
      localStorage.setItem("saved", JSON.stringify(data))
    });
  }








  function togglePicker() {
    $('#initial').fadeOut('500', function() {});
    for (var i = 0; i < 12; i++) {
      buildPickerLayout(i);
    }
    setTimeout(function() {
      $('#picker').fadeIn('500', function() {});
    }, 500);
  }

  function toggleStory() {
    buildStory()
    $('#picker').fadeOut('500', function() {});
    setTimeout(function() {
      $('#story').fadeIn('500', function() {});
    }, 500);
  }

  function buildPickerLayout(i) {
    let newiframe = document.createElement("iframe")
    // newiframe.setAttribute('src', 'https://giphy.com/embed/Q7Eezvahu2Hrq');
    newiframe.setAttribute('src', savedSearch.data[i].embed_url);
    // newiframe.setAttribute('width', '341');
    // newiframe.setAttribute('height', '480');
    newiframe.setAttribute('frameBorder', '0');
    newiframe.classList.add('giphy-embed')
    newiframe.classList.add('justify-content-center')
    newiframe.classList.add('col-xl-3')

    // console.log("newGifsSet = " + newGifsSet);
    console.log("newiframe = " + newiframe);

    // newGifsSet.append(newiframe)
    $('#pickerRow').append(newiframe)
  }

  function buildStory() {
    let newRow = document.createElement("div")
    newRow.classList.add("col-xl-7", "col-lg-12", "col-md-12", "col-sm-12", "col-xs-12")
    let newHeader = document.createElement("h2")
    let newText = document.createTextNode("Once upon a time there was a beautiful KNIGHT...")
    newHeader.append(newText)
    newRow.append(newHeader)

    let newiframe = document.createElement("iframe")
    // newiframe.setAttribute('src', 'https://giphy.com/embed/Q7Eezvahu2Hrq');
    newiframe.setAttribute('src', savedSearch.data[0].embed_url);
    // newiframe.setAttribute('width', '341');
    // newiframe.setAttribute('height', '480');
    newiframe.setAttribute('frameBorder', '0');
    newiframe.classList.add('giphy-embed')
    newiframe.classList.add('justify-content-center')
    newiframe.classList.add('col-xl-5')

    $('#storyRow').append(newRow)
    $('#storyRow').append(newiframe)


    console.log("newRow = " + newRow);
  }



  $('#create').click(togglePicker)
  $('#picker').click(toggleStory)
});