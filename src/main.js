$(document).ready(function() {
  // the current search/render index
  let renderIndex = 0;
  // the current user/gif pick index
  let screenIndex = 0;
  let useWebP = false;
  let cachedImages = []
  let shuffleOrder = []

  async function supportsWebp() {
    if (!self.createImageBitmap) return false;

    const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    const blob = await fetch(webpData).then(r => r.blob());
    return createImageBitmap(blob).then(() => true, () => false);
  }

  (async () => {
    if (await supportsWebp()) {
      useWebP = true
    } else {
      console.log('does not support');
    }
    getSearchTerm()
  })();

  let savedSearch = {}
  let storyData = [{
      lineNum: 0,
      line: "So I recently went fishing.",
      searchTerm: "fishing"
    },
    {
      lineNum: 1,
      line: "Fishing invariably makes me angry.",
      searchTerm: "angry"
    },
    {
      lineNum: 2,
      line: "Most people like to fish in streams, but I, in my laziness, like to fish in big puddles.",
      searchTerm: "big puddles"
    },
    {
      lineNum: 3,
      line: "Standing timidly, I baited the hook with a slimy slug.",
      searchTerm: "slimy slug"
    },
    {
      lineNum: 4,
      line: "Feeling good, I jokingly cast my fishing rod.",
      searchTerm: "fishing rod"
    }, {
      lineNum: 5,
      line: "I waited for a whole fortnight, jumping to relieve the my very bored self...",
      searchTerm: "bored"
    }, {
      lineNum: 6,
      line: "when finally a fish caught my attention.",
      searchTerm: "fish"
    }, {
      lineNum: 7,
      line: "Merrily, I pulled on my fishing rod, straining until my last ounce of strength was gone,",
      searchTerm: "strength"
    }, {
      lineNum: 8,
      line: "and reeled in my catch.",
      searchTerm: "reeled in"
    }, {
      lineNum: 9,
      line: "And all of a sudden, lying before me was an angry bear.",
      searchTerm: "angry bear"
    }, {
      lineNum: 10,
      line: "I was anxious.",
      searchTerm: "anxious"
    }, {
      lineNum: 11,
      line: "But to my utmost surprise, when I was most scared, the bear started to choke and fall over.",
      searchTerm: "fall over"
    }, {
      lineNum: 12,
      line: "Politely, I dropped my fishing kite and began to run away to the woods, without looking back.",
      searchTerm: "run away"
    }, {
      lineNum: 13,
      line: "I don't know when I've been so happy.",
      searchTerm: "happy"
    }
  ]



  Array.prototype.shuffle = function() {
    var i = this.length,
      j, temp;
    if (i == 0) return this;
    while (--i) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this[i];
      this[i] = this[j];
      this[j] = temp;
    }
    return this;
  }

  storyData.shuffle()
  console.log(storyData);


  // console.log(storyData);
  // debug to skip sequence
  // $('#initial').hide('slow/400/fast', function() {});
  // $('#picker').show('slow/400/fast', function() {});
  // $('#story').hide('slow/400/fast', function() {});



  // initial search term


  function getSearchTerm() {
    // console.log("search on index " + renderIndex);
    let urlStem = 'https://api.giphy.com/v1/gifs/search?api_key=CTnSxefMIGBG1JxWvBr6zVvKSLu7FQAw&q='
    let urlTail = '&limit=32&offset=0&rating=PG&lang=en'
    let url = urlStem + encodeURIComponent(storyData[renderIndex].searchTerm) + urlTail
    // console.log(url);

    // $("#image")[0].href = "";
    // console.log($('#pickerRow' + renderIndex));

    if (localStorage.getItem(storyData[renderIndex].searchTerm) !== null ||
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
    newRow.classList.add('row', 'pickerRow', 'justify-content-center', 'col-xl-12', 'col-lg-8', 'col-md-8', 'col-sm-8', 'col-xs-8')

    // console.log(savedSearch.data);
    for (let j = 0; j < 32; j++) {
      let newContainer = document.createElement("div")
      newContainer.classList.add('col-xl-3', 'gif-box')

      let newIframe = document.createElement("img")
      // newIframe.setAttribute('src', savedSearch.data[j].embed_url);
      // console.log(j);
      // console.log(typeof savedSearch.data[j].images.preview_webp);
      if (useWebP === true && typeof savedSearch.data[j].images.preview_webp !== 'undefined') {
        newIframe.setAttribute('src', savedSearch.data[j].images.preview_webp.url)
      } else if (typeof savedSearch.data[j].images.preview_gif !== 'undefined') {
        newIframe.setAttribute('src', savedSearch.data[j].images.preview_gif.url);
      } else {
        newIframe.setAttribute('src', savedSearch.data[j].images.fixed_width_small.url);
      }

      newIframe.setAttribute('name', savedSearch.data[j].images.original.url);
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
    $('#navbar').fadeIn('0', function() {}).css('display', 'flex');

    // $('#top').gotoAnchor();
    // window.scrollTo(0, 0)


    $('#initial').animate({
      'opacity': '0'
    }, 300);
    $('#initial').hide('0', function() {})

    //$('#picker').fadeIn('2000', function() {}).css('display', 'flex');
    $('#picker').animate({
      'opacity': '1'
    }, 1000);

    window.scrollTo(0, 0)

    // $('#picker').show('5000', function() {});
    //   $('#picker').slideDown('5000', function() {})
    // }, 0);
    showPickerRow(event)
  }

  function showPickerRow(event) {
    // console.log("clicked on picker, renderIndex =" + renderIndex);
    // console.log("clicked on picker, screenIndex =" + screenIndex);
    // console.log(event);

    if (screenIndex < storyData.length)
      $('#numPicked').text(screenIndex + 1)

    if (screenIndex > 0) {
      // console.log(event);
      storyData[screenIndex - 1].lineGif = event.target.children[0].name

      // preload image
      cachedImages[screenIndex - 1] = new Image();
      cachedImages[screenIndex - 1].src = event.target.children[0].name


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

        // let firstLetter = storyData[screenIndex].searchTerm[0].toLowerCase()
        // if (firstLetter === 'a' || firstLetter === 'e' || firstLetter === 'i' || firstLetter === 'o' || firstLetter === 'u') {
        //   $('#pickWord').text('Pick')
        // } else {
        //   $('#pickWord').text('Pick')
        // }
        $('#searchWord').text(storyData[screenIndex].searchTerm)

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
    // console.log(storyData);
    // debugger;
    // $('#story').fadeIn('1000', function() {});
    // $('#storyRow0').fadeIn('5000', function() {});
    // $('#top').gotoAnchor();
    window.scrollTo(0, 0);

    // $('#picker').animate({
    //   'opacity': '0'
    // }, 1000);
    // $('#initialContainer').fadeOut('5000', function() {});
    // $('#initialContainer').fadeOut('5000', function() {});

    $('#initialContainer').animate({
      'opacity': '0'
    }, 1500);


    $('#picker').animate({
      'opacity': '0'
    }, 1000);

    $('#picker').hide('0', function() {});
    // $('#story').fadeIn('1000', function() {});
    $('#story').animate({
      'opacity': '1'
    }, 0);


    $('#initialContainer').delay(1000).animate({
      'opacity': '1'
    }, 1250);
  }



  function buildStory() {

    storyData.sort(function(a, b) {
      return a.lineNum - b.lineNum
    });
    console.log(storyData);

    for (let i = 0; i < storyData.length; i++) {
      let newRow = document.createElement("div")
      newRow.setAttribute('id', 'storyRow' + i);
      newRow.classList.add('row', 'storyRow')

      let newTextBlock = document.createElement("div")
      if (i === 0) {
        newTextBlock.classList.add("story-box-first", "col-xl-7", "col-lg-12", "col-md-12", "col-sm-12", "col-xs-12")
      } else {
        newTextBlock.classList.add("story-box", "col-xl-7", "col-lg-12", "col-md-12", "col-sm-12", "col-xs-12")
      }

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


      let newIframe = document.createElement("img")
      // newIframe.setAttribute('src', 'https://giphy.com/embed/Q7Eezvahu2Hrq');
      newIframe.setAttribute('src', storyData[i].lineGif);
      newIframe.setAttribute('width', '100%');
      newIframe.setAttribute('height', '100%');
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
      let bottom_of_object;
      if (window.matchMedia("(min-width: 1200px)").matches) {
        // console.log("1200px");
        bottom_of_object = $(this).offset().top + ($(this).outerHeight()) * .8
      } else {
        // console.log("smaller");
        bottom_of_object = $(this).offset().top + ($(this).outerHeight()) * 1 / 10
      }

      let bottom_of_window = $(window).scrollTop() + $(window).height();

      /* If the object is completely visible in the window, fade it it */
      if (bottom_of_window > bottom_of_object) {
        //$(this).animate({ 'opacity': '1'}, 500);
        $(this).animate({
          'opacity': '1'
        }, 1300);
      }
    });
  });
  //
  //
  // /* Every time the window is scrolled ... */
  // $(window).scroll(function() {
  //   /* Check the location of each desired element */
  //   $('.gif-story-box').each(function(i) {
  //     let top_of_object;
  //     if (window.matchMedia("(min-width: 1200px)").matches) {
  //       // console.log("1200px");
  //       top_of_object = $(this).offset().bottom + ($(this).outerHeight()) * .8
  //     } else {
  //       // console.log("smaller");
  //       top_of_object = $(this).offset().bottom + ($(this).outerHeight()) * 1 / 10
  //     }
  //
  //     let top_of_window = $(window).scrollBottom() + $(window).height();
  //
  //     /* If the object is completely visible in the window, fade it it */
  //     if (top_of_window > top_of_object) {
  //       //$(this).animate({ 'opacity': '1'}, 500);
  //       $(this).animate({
  //         'opacity': '1'
  //       }, 1300);
  //     }
  //   });
  // });
  //
  //
  // $(window).scroll(function() {
  //   /* Check the location of each desired element */
  //   $('.gif-story-box').each(function(i) {
  //     let bottom_of_object;
  //     if (window.matchMedia("(min-width: 1200px)").matches) {
  //       // console.log("1200px");
  //       bottom_of_object = $(this).offset().top + ($(this).outerHeight()) * .8
  //     } else {
  //       // console.log("smaller");
  //       bottom_of_object = $(this).offset().top + ($(this).outerHeight()) * 1 / 10
  //     }
  //
  //     let bottom_of_window = $(window).scrollTop() + $(window).height();
  //
  //     /* If the object is completely visible in the window, fade it it */
  //     if (bottom_of_window > bottom_of_object) {
  //       //$(this).animate({ 'opacity': '1'}, 500);
  //       $(this).closest('.storyRow').prev().animate({
  //         'opacity': '0'
  //       }, 1300);
  //     }
  //   });
  // });


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


// module.exports = {
//   getSearchTerm,
// }