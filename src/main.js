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
      line: "Most people like to fish in streams, but I, in my laziness, like to fish in big puddles.",
      searchTerm: "big puddles"
    },
    {
      line: "Standing timidly, I baited the hook with a slimy slug.",
      searchTerm: "slimy slug"
    }, {
      line: "Feeling good, I jokingly cast my fishing rod.",
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
      searchTerm: "fall over"
    }, {
      line: "Politely, I dropped my fishing kite and began to run away to the woods, without looking back.",
      searchTerm: "run away"
    }, {
      line: "I don't know when I've been so happy.",
      searchTerm: "happy"
    }
  ]

  console.log(storyData);
  // debug to skip sequence
  // $('#initial').hide('slow/400/fast', function() {});
  // $('#picker').show('slow/400/fast', function() {});
  // $('#story').hide('slow/400/fast', function() {});



  // initial search term
  getSearchTerm(renderIndex)

  function getSearchTerm() {
    // console.log("search on index " + renderIndex);
    let urlStem = 'https://api.giphy.com/v1/gifs/search?api_key=CTnSxefMIGBG1JxWvBr6zVvKSLu7FQAw&q='
    let urlTail = '&limit=32&offset=0&rating=G&lang=en'
    let url = urlStem + encodeURIComponent(storyData[renderIndex].searchTerm) + urlTail
    console.log(url);

    // $("#image")[0].href = "";
    // console.log($('#pickerRow' + renderIndex));

    if (localStorage.getItem(storyData[renderIndex].searchTerm) !== null &&
      savedSearch.length > 0) {
      console.log("save exists");

      savedSearch = JSON.parse(localStorage.getItem(storyData[renderIndex].searchTerm))
      // console.log(savedSearch);
      buildPickerLayout()
    } else {
      console.log("no save");
      let promise = $.getJSON(url, function(data) {
        // console.log(data);
        savedSearch = data;
        localStorage.setItem(storyData[renderIndex].searchTerm, JSON.stringify(data))
      });

      promise.done(function() {
        buildPickerLayout()
      });
    }
  }

  function buildPickerLayout() {
    // console.log("build picker on index " + renderIndex);
    let newRow = document.createElement("div")
    newRow.setAttribute('id', 'pickerRow' + renderIndex);
    newRow.classList.add('row', 'pickerRow')

    console.log(savedSearch.data);
    for (let j = 0; j < 32; j++) {
      let newContainer = document.createElement("div")
      newContainer.classList.add('justify-content-center', 'col-xl-3', 'gif-box')

      let newIframe = document.createElement("img")
      // newIframe.setAttribute('src', savedSearch.data[j].embed_url);
      newIframe.setAttribute('src', savedSearch.data[j].images.fixed_width.webp);
      newIframe.setAttribute('name', savedSearch.data[j].embed_url);
      newIframe.setAttribute('frameBorder', '0');
      newIframe.setAttribute('width', '100%');
      newIframe.setAttribute('height', '100%');
      // newIframe.setAttribute('style', 'position:absolute');
      newIframe.classList.add('giphy-embed')

      // console.log("newGifsSet = " + newGifsSet);
      // console.log("newIframe = " + newIframe);
      newContainer.append(newIframe)
      newRow.append(newContainer)
    }
    renderIndex++


    // newGifsSet.append(newIframe)
    $('#picker').append(newRow)
  }


  function togglePicker(event) {
    $('#picker').fadeIn('0', function() {});
    window.scrollTo(0, 0);
    // $('#top').gotoAnchor();
    $('#initial').fadeOut('2000', function() {})



    // $('#picker').show('5000', function() {});
    //   $('#picker').slideDown('5000', function() {})
    // }, 0);
    showPickerRow(event)
  }

  function showPickerRow(event) {
    // console.log("clicked on picker, renderIndex =" + renderIndex);
    // console.log("clicked on picker, screenIndex =" + screenIndex);
    // console.log(event);

    if (screenIndex > 0) {
      console.log(event);
      storyData[screenIndex - 1].lineGif = event.target.children[0].name
      // console.log(storyData[screenIndex - 1].lineGif);
    }

    if (screenIndex < storyData.length) {
      setTimeout(function() {
        //   $('#pickerRow' + index).fadeIn('2000', function() {});
        // }, 2000);
        if (screenIndex > 0) {
          $('#pickerRow' + (screenIndex - 1)).fadeOut('1000', function() {})
          $('#pickerRow' + (screenIndex - 1)).remove()
        }
        // $('#top').gotoAnchor();
        window.scrollTo(0, 0);
        $('#pickerRow' + screenIndex).fadeIn('1000', function() {}).css('display', 'flex')

        let firstLetter = storyData[screenIndex].searchTerm[0].toLowerCase()
        if (firstLetter === 'a' || firstLetter === 'e' || firstLetter === 'i' || firstLetter === 'o' || firstLetter === 'u') {
          $('#pickWord').text('Pick')
        } else {
          $('#pickWord').text('Pick')
        }
        $('#searchWord').text("'" + storyData[screenIndex].searchTerm + "'")

        screenIndex++
      }, 0);

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
    console.log(storyData);
    // debugger;
    $('#story').fadeIn('0', function() {});
    // $('#storyRow0').fadeIn('5000', function() {});
    // $('#top').gotoAnchor();
    window.scrollTo(0, 0);
    $('#picker').fadeOut('5000', function() {});
  }



  function buildStory() {
    for (let i = 0; i < storyData.length; i++) {
      let newRow = document.createElement("div")
      newRow.setAttribute('id', 'storyRow' + i);
      newRow.classList.add('row', 'storyRow')

      let newTextBlock = document.createElement("div")
      newTextBlock.classList.add("story-box", "col-xl-7", "col-lg-12", "col-md-12", "col-sm-12", "col-xs-12")
      let newHeader = document.createElement("h2")
      let newText = document.createTextNode(storyData[i].line)
      newHeader.append(newText)
      newTextBlock.append(newHeader)

      let newGifBlock = document.createElement("div")

      if (i === 0) {
        newGifBlock.classList.add("col-xl-5", "col-lg-12", "col-md-12", "col-sm-12", "col-xs-12", "gif-story-box-first")
      } else {
        newGifBlock.classList.add("col-xl-5", "col-lg-12", "col-md-12", "col-sm-12", "col-xs-12", "gif-story-box")
      }


      let newIframe = document.createElement("iframe")
      // newIframe.setAttribute('src', 'https://giphy.com/embed/Q7Eezvahu2Hrq');
      newIframe.setAttribute('src', storyData[i].lineGif);
      // newIframe.setAttribute('width', '341');
      // newIframe.setAttribute('height', '480');
      newIframe.setAttribute('frameBorder', '0');
      newIframe.classList.add('giphy-embed', 'justify-content-center', 'col-xl-5', 'align-middle')

      newGifBlock.append(newIframe)

      newRow.append(newTextBlock)
      newRow.append(newGifBlock)



      $('#story').append(newRow)
    }
    // console.log("newRow = " + newRow);
  }

  /* Every time the window is scrolled ... */
  $(window).scroll(function() {
    /* Check the location of each desired element */
    $('.gif-story-box').each(function(i) {
      let bottom_of_object = $(this).offset().top + $(this).outerHeight() - 100;
      let bottom_of_window = $(window).scrollTop() + $(window).height();

      /* If the object is completely visible in the window, fade it it */
      if (bottom_of_window > bottom_of_object) {
        //$(this).animate({ 'opacity': '1'}, 500);
        $(this).animate({
          'opacity': '1'
        }, 1000);
      }
    });
  });

  $.fn.gotoAnchor = function(anchor) {
    location.href = this.selector;
  }

  // $('#create').click(togglePicker);
  $('#create').click(function(event) {
    event.preventDefault()
    togglePicker(event)
  })
  $('#picker').click(function(event) {
    event.preventDefault()
    showPickerRow(event)
  })

  // $('#picker').click(toggleStory)
});