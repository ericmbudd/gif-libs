$(document).ready(function() {
  // the current search/render index
  let renderIndex = 0;
  // the current user/gif pick index
  let screenIndex = 0;

  let savedSearch = {}
  let storyData = [{
      line: "So I recently went fishing.",
      searchTerm: "fishing"
    },
    {
      line: "Fishing invariably makes me angry.",
      searchTerm: "angry"
    },
    {
      line: "Most people like to fish in streams, but I, in my laziness, like to fish in hurricanes.",
      searchTerm: "hurricanes"
    }, {
      line: "Standing timidly, I baited the hook with a slimy slug.",
      searchTerm: "slimy slug"
    }, {
      line: "Leaning back, I jokingly cast my fishing rod.",
      searchTerm: "fishing rod"
    }, {
      line: "I waited for a whole fortnight, jumping to relieve the my very bored self",
      searchTerm: "bored"
    }, {
      line: "when finally a fish caught my attention.",
      searchTerm: "fish"
    }, {
      line: "Merrily, I pulled on my fishing rod, straining until my last ounce of love was gone,",
      searchTerm: "straining"
    }, {
      line: "and reeled in my catch.",
      searchTerm: "reeled in"
    }, {
      line: "And all of a sudden, lying before me was an angry bear.",
      searchTerm: "angry bear"
    }, {
      line: "I was anxious.",
      searchTerm: "anxious"
    }, {
      line: "But to my utmost surprise, when I was most scared, the bear started to choke and fall over.",
      searchTerm: "butterfly"
    }, {
      line: "Politely, I dropped my fishing kite and began to run away to the woods, without looking back.",
      searchTerm: "run away"
    }, {
      line: "I don't know when I've been so happy.",
      searchTerm: "happy"
    }

  ]
  // debug to skip sequence
  // $('#initial').hide('slow/400/fast', function() {});
  // $('#picker').show('slow/400/fast', function() {});
  // $('#story').hide('slow/400/fast', function() {});



  // initial search term
  getSearchTerm(renderIndex)

  function getSearchTerm() {
    console.log("search on index " + renderIndex);
    let urlStem = 'https://api.giphy.com/v1/gifs/search?api_key=CTnSxefMIGBG1JxWvBr6zVvKSLu7FQAw&q='
    let urlTail = '&limit=25&offset=0&rating=G&lang=en'
    let url = urlStem + storyData[renderIndex].searchTerm + urlTail


    // $("#image")[0].href = "";
    console.log($('#pickerRow' + renderIndex));

    if (localStorage.getItem(storyData[renderIndex].searchTerm) !== null) {
      console.log("save exists");

      savedSearch = JSON.parse(localStorage.getItem(storyData[renderIndex].searchTerm))
      // console.log(savedSearch);
      buildPickerLayout(renderIndex)
    } else {
      console.log("no save");
      let promise = $.getJSON(url, function(data) {
        // console.log(data);
        savedSearch = data;
        localStorage.setItem(storyData[renderIndex].searchTerm, JSON.stringify(data))
      });

      promise.done(function() {
        buildPickerLayout(renderIndex)
      });
    }
  }

  function buildPickerLayout() {
    console.log("build picker on index " + renderIndex);
    let newRow = document.createElement("div")
    newRow.setAttribute('id', 'pickerRow' + renderIndex);
    newRow.classList.add('row', 'pickerRow')

    for (let j = 0; j < 12; j++) {
      let newContainer = document.createElement("div")
      newContainer.classList.add('justify-content-center', 'col-xl-3', 'gif-box')

      let newIframe = document.createElement("iframe")
      newIframe.setAttribute('src', savedSearch.data[j].embed_url);
      // newIframe.setAttribute('src', savedSearch.data[j].images.preview_webp.url);
      newIframe.setAttribute('frameBorder', '0');
      newIframe.classList.add('giphy-embed', 'justify-content-center')

      // console.log("newGifsSet = " + newGifsSet);
      // console.log("newIframe = " + newIframe);
      newContainer.append(newIframe)
      newRow.append(newContainer)
    }
    renderIndex++


    // newGifsSet.append(newIframe)
    $('#picker').append(newRow)
  }


  function togglePicker() {
    $('#initial').fadeOut('1000', function() {})
    setTimeout(function() {
      $('#picker').fadeIn('1000', function() {});
    }, 0);


    // $('#picker').show('5000', function() {});
    //   $('#picker').slideDown('5000', function() {})
    // }, 0);
    showPickerRow({})
  }

  function showPickerRow(event) {
    console.log("clicked on picker, renderIndex =" + renderIndex);
    console.log("clicked on picker, screenIndex =" + screenIndex);



    // console.log(event);
    if (screenIndex > 0) {
      storyData[screenIndex - 1].lineGif = event.target.children[0].src
      // console.log(storyData[screenIndex - 1].lineGif);
    }

    if (screenIndex < storyData.length) {
      setTimeout(function() {
        //   $('#pickerRow' + index).fadeIn('2000', function() {});
        // }, 2000);
        if (screenIndex > 0) {
          $('#pickerRow' + (screenIndex - 1)).fadeOut('500', function() {})
          $('#pickerRow' + (screenIndex - 1)).remove()
        }
        $('#pickerRow' + screenIndex).slideDown('1000', function() {}).css('display', 'flex')

        let firstLetter = storyData[screenIndex].searchTerm[0].toLowerCase()
        if (firstLetter === 'a' || firstLetter === 'e' || firstLetter === 'i' || firstLetter === 'o' || firstLetter === 'u') {
          $('#pickWord').text('Pick an')
        } else {
          $('#pickWord').text('Pick a')
        }
        $('#searchWord').text("'" + storyData[screenIndex].searchTerm + "'")

        screenIndex++
      }, 500);

      // do next search/build
      if (renderIndex < storyData.length) {
        getSearchTerm(renderIndex)
        // buildPickerLayout(renderIndex)
      }
    } else {
      toggleStory()
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
    for (let i = 0; i < storyData.length; i++) {
      let newRow = document.createElement("div")
      newRow.setAttribute('id', 'storyRow' + i);
      newRow.classList.add('row', 'storyRow')

      let newTextBlock = document.createElement("div")
      newTextBlock.classList.add("col-xl-7", "col-lg-12", "col-md-12", "col-sm-12", "col-xs-12")
      let newHeader = document.createElement("h2")
      let newText = document.createTextNode(storyData[i].line)
      newHeader.append(newText)
      newTextBlock.append(newHeader)

      let newGifBlock = document.createElement("div")
      newGifBlock.classList.add("col-xl-5", "col-lg-12", "col-md-12", "col-sm-12", "col-xs-12", "gif-story-box")

      let newIframe = document.createElement("iframe")
      // newIframe.setAttribute('src', 'https://giphy.com/embed/Q7Eezvahu2Hrq');
      newIframe.setAttribute('src', storyData[i].lineGif);
      // newIframe.setAttribute('width', '341');
      // newIframe.setAttribute('height', '480');
      newIframe.setAttribute('frameBorder', '0');
      newIframe.classList.add('giphy-embed', 'justify-content-center', 'col-xl-5', 'align-top')

      newGifBlock.append(newIframe)

      newRow.append(newTextBlock)
      newRow.append(newGifBlock)

      $('#story').append(newRow)
    }
    // console.log("newRow = " + newRow);
  }

  $('#create').click(togglePicker);
  $('#picker').click(function(event) {
    showPickerRow(event)
  })

  // $('#picker').click(toggleStory)
});