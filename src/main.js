$(document).ready(function() {
  // the current search/render index
  let renderIndex = 0;
  // the current user/gif pick index
  let screenIndex = 0;

  let savedSearch = {}
  let storyData = [{
      line: "Once upon a time, there was a beautiful knight named Darleen",
      searchTerm: "knight"
    },
    {
      line: "who, by his valiant vitality, saved the kingdom from the stupid",
      searchTerm: "stupid"
    },
    {
      line: "dragon and condemned the princess in the nick of time. He rode his ghastly butterfly",
      searchTerm: "butterfly"
    }
  ]
  // debug to skip sequence
  // $('#initial').hide('slow/400/fast', function() {});
  // $('#picker').show('slow/400/fast', function() {});
  // $('#story').hide('slow/400/fast', function() {});

  // initial search term
  getSearchTerm(renderIndex)
  buildPickerLayout(renderIndex)

  function getSearchTerm() {
    console.log("search on index " + renderIndex);
    let urlStem = 'https://api.giphy.com/v1/gifs/search?api_key=CTnSxefMIGBG1JxWvBr6zVvKSLu7FQAw&q='
    let urlTail = '&limit=25&offset=0&rating=PG&lang=en'
    let url = urlStem + storyData[renderIndex].searchTerm + urlTail
    // let url = "https://api.giphy.com/v1/gifs/search?api_key=CTnSxefMIGBG1JxWvBr6zVvKSLu7FQAw&q=knight&limit=25&offset=0&rating=PG&lang=en"


    // $("#image")[0].href = "";
    console.log($('#pickerRow' + renderIndex));

    if (localStorage.getItem(storyData[renderIndex].searchTerm) !== null) {
      console.log("save exists");

      savedSearch = JSON.parse(localStorage.getItem(storyData[renderIndex].searchTerm))
      console.log(savedSearch);
    } else {
      console.log("no save");
      $.getJSON(url, function(data) {
        console.log(data);
        savedSearch = data;
        localStorage.setItem(storyData[renderIndex].searchTerm, JSON.stringify(data))
      });
    }
  }

  function buildPickerLayout() {
    console.log("build picker on index " + renderIndex);
    let newRow = document.createElement("div")
    newRow.setAttribute('id', 'pickerRow' + renderIndex);
    newRow.classList.add('row', 'pickerRow')

    for (let j = 0; j < 12; j++) {
      let newIframe = document.createElement("iframe")
      newIframe.setAttribute('src', savedSearch.data[j].embed_url);
      // newIframe.setAttribute('src', savedSearch.data[j].images.preview_webp.url);
      newIframe.setAttribute('frameBorder', '0');
      newIframe.classList.add('giphy-embed', 'justify-content-center', 'col-xl-3')

      // console.log("newGifsSet = " + newGifsSet);
      // console.log("newIframe = " + newIframe);

      newRow.append(newIframe)

    }
    renderIndex++
    //
    // for (let j = 4; j < 8; j++) {
    //   let newIframe = document.createElement("iframe")
    //   newIframe.setAttribute('src', savedSearch.data[j].embed_url);
    //   // newIframe.setAttribute('src', savedSearch.data[j].images.preview_webp.url);
    //   newIframe.setAttribute('frameBorder', '0');
    //   newIframe.classList.add('giphy-embed', 'justify-content-center', 'col-xl-3')
    //
    //   // console.log("newGifsSet = " + newGifsSet);
    //   console.log("newIframe = " + newIframe);
    //
    //   newRow.append(newIframe)
    // }
    // for (let j = 8; j < 12; j++) {
    //   let newIframe = document.createElement("iframe")
    //   newIframe.setAttribute('src', savedSearch.data[j].embed_url);
    //   // newIframe.setAttribute('src', savedSearch.data[j].images.preview_webp.url);
    //   newIframe.setAttribute('frameBorder', '0');
    //   newIframe.classList.add('giphy-embed', 'justify-content-center', 'col-xl-3')
    //
    //   // console.log("newGifsSet = " + newGifsSet);
    //   console.log("newIframe = " + newIframe);
    //
    //   newRow.append(newIframe)
    // }


    // newGifsSet.append(newIframe)
    $('#picker').append(newRow)
  }


  function togglePicker() {
    $('#initial').fadeOut('500', function() {})
    setTimeout(function() {
      $('#picker').fadeIn('500', function() {});
    }, 500);


    // $('#picker').show('5000', function() {});
    //   $('#picker').slideDown('5000', function() {})
    // }, 0);
    showPickerRow()
  }

  function showPickerRow() {
    console.log("clicked on picker, renderIndex =" + renderIndex);
    console.log("clicked on picker, screenIndex =" + screenIndex);

    setTimeout(function() {
      //   $('#pickerRow' + index).fadeIn('2000', function() {});
      // }, 2000);
      if (screenIndex > 0) {
        $('#pickerRow' + (screenIndex - 1)).fadeOut('500', function() {})
        $('#pickerRow' + (screenIndex - 1)).remove()
      }
      $('#pickerRow' + screenIndex).slideDown('5000', function() {})
      screenIndex++
    }, 0);

    // do next search/build
    if (renderIndex < storyData.length) {
      getSearchTerm(renderIndex)
      buildPickerLayout(renderIndex)
    }
  }



  function toggleStory() {
    buildStory()
    $('#picker').fadeOut('500', function() {});
    setTimeout(function() {
      $('#story').fadeIn('500', function() {});
    }, 500);
  }



  function buildStory() {
    let newRow = document.createElement("div")
    newRow.classList.add("col-xl-7", "col-lg-12", "col-md-12", "col-sm-12", "col-xs-12")
    let newHeader = document.createElement("h2")
    let newText = document.createTextNode("Once upon a time there was a beautiful KNIGHT...")
    newHeader.append(newText)
    newRow.append(newHeader)

    let newIframe = document.createElement("iframe")
    // newIframe.setAttribute('src', 'https://giphy.com/embed/Q7Eezvahu2Hrq');
    newIframe.setAttribute('src', savedSearch.data[0].embed_url);
    // newIframe.setAttribute('width', '341');
    // newIframe.setAttribute('height', '480');
    newIframe.setAttribute('frameBorder', '0');
    newIframe.classList.add('giphy-embed')
    newIframe.classList.add('justify-content-center')
    newIframe.classList.add('col-xl-5')

    $('#storyRow').append(newRow)
    $('#storyRow').append(newIframe)

    // console.log("newRow = " + newRow);
  }

  $('#create').click(togglePicker);
  $('#picker').click(function() {
    showPickerRow();
  })
  // $('#picker').click(toggleStory)
});