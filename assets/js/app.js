$(document).ready(function() {
  var apiKey = 'dc6zaTOxFJmzC';
  var searchUrl;
  var searchParams;
  var defaultButtons = ['Science', 'Math', 'Geometry', 'Physics', 'Circles', 'Triangles', 'Fibonacci', 'Statistics', 'Chemistry'];

  // This is how we get our still and moving images
  function findImage(imageObject) {
    var imageUrlStill;
    var imageUrlMoving;
    let keys = Object.keys(imageObject);
    keys.forEach(function(key) {
      if (key === 'original_still') {
        imageUrlStill = imageObject[key].url;
      }else if (key === 'original') {
        imageUrlMoving = imageObject[key].url;
      }

    });
    return { imageUrlStill, imageUrlMoving };
  }
  // create our images with our click handlers to switch from the still image and moving image
  function createImage(imgUrl) {
      var target = $('<div>');
      var img = $('<img>');
      target.addClass('col-lg-4 images');
      img.attr('src', imgUrl.imageUrlStill);
      img.css({ width: '100%' });
      target.append(img);
      target.on('click', function(e) {
        img.toggleClass('movingImage');
        if ($(img).hasClass('movingImage')) {
          img.attr('src', imgUrl.imageUrlMoving)
        } else {
          img.attr('src', imgUrl.imageUrlStill);
        }
      });
      return target;
  }
  function fetchGiphs() {
    var imageContainer = $('#imageContainer');

    var imagesEl;
    searchParams = $(this).text();
    searchUrl = `https://api.giphy.com/v1/gifs/search?q=${searchParams}&rating=pg&limit=10&api_key=${apiKey}`
    imageContainer.html('')
    $.ajax({
      url: searchUrl,
      method: 'GET',
    }).then(function(json) {
      json.data.forEach(function(val) {
       var keys = Object.keys(val);
      //  console.log(' WHAT ARE THE KEYSSSS', keys);
       keys.forEach(function(key) {
         var image;
         if(key === 'images' && key !== 'undefined') {
          image = findImage(val[key]);
          imagesEl = createImage(image);
          imageContainer.append(imagesEl);
         }
       });
     });
   })

  //  $('#science').html(div)
 }
  /** lets create our buttons on ready and set up our handler for each button to
  *   go poll the Giphy Api and get our images.
  */
  $.each(defaultButtons, function(index,value) {
    var button = $('<button>');
    var div = $('<div>');
    var targetEl = $('#giphButtons');
    button.text(value);
    button.click(fetchGiphs);
    targetEl.append(button);
  });
function createNewButton(text) {
  var button = $('<button>');
  button.text(text);
  button.click(fetchGiphs);
  $('#giphButtons').append(button);
}

$('#inputTarget').submit(function(e) {
  e.preventDefault();
  let input = $('input[type=text][name=search]')
  createNewButton(input.val());
  input.val('');
})







});
