//FOR JAVASCRIPT DEMONSTRATION PURPUSES ONLY, NEVER DISCLOSE YOUR KEYS TO THIRD PARTIES!
      
var client_id = '';
      
var app_key   = '';

var ajaxRequest = new XMLHttpRequest();

var bottles = ['#male_millenial', '#female_millenial', '#male_traditional', '#female_traditional'];
var comments = ['#comment-male-millenial', '#comment-female-millenial', '#comment-male-traditional', '#comment-female-traditional'];
var shouldSendRequest = true;

var requestInterval;

function success( result ) {

  if (!shouldSendRequest)
    return;

  if( result.persons.length > 0 ) {
    age        = result.persons[0].age.value;
    gender     = result.persons[0].gender.value;
    confidence = result.persons[0].gender.confidence;

    if (confidence < 50) 
      return

      // return $('#advertisement').attr( 'src', 'generic.jpeg' )

    // ajaxRequest.open("GET", "http://172.20.10.4:3000/open", true);
    // ajaxRequest.send();
    // $('#advertisement').attr( 'src', 'img/introBud.gif' );
    if ( gender == "Male") {
      if (age < 30)
        animateBottle(0)
      else
        animateBottle(2);
    } else {
      if (age < 30)
        animateBottle(1);
      else
        animateBottle(3);
    }
	}
}
  
function animateBottle (index) {
  $('#status').html('Curating your playlist');
  setTimeout(function () {
    $('#status').addClass('transparent');
    $('audio')[index].play();
  }, 5000);
  shouldSendRequest = false;
  clearInterval(requestInterval);
  $(comments[index]).css('display', 'flex').addClass('animated fadeIn');
  $('.ico_container').css('display', 'flex').addClass('animated fadeIn');
  for (var i = 0, l = bottles.length; i < l; i++) {
    if (i == index) {
      $(bottles[i]).css('animation-iteration-count', '3').addClass('animated bounce');
    } else {
      $(bottles[i]).addClass('animated fadeOut');
    }
  }
}     

function failure( error ) {
  // alert( error );
}
  
      
function sendDetectRequest() {
  var img = document.querySelector( "#img_snapshot" );
	if( img.naturalWidth == 0 ||  img.naturalHeight == 0 ) // Check if a snapshot has been taken
    return;
	var imgBlob = FACE.util.dataURItoBlob( img.src );
	FACE.sendImage( imgBlob, success, failure, app_key, client_id, 'age,gender,mood' );
}
  

function startCapture() {
  FACE.webcam.startPlaying( "webcam_preview" );
  requestInterval = setInterval( function () {
    FACE.webcam.takePicture( "webcam_preview", "img_snapshot" );
    sendDetectRequest();
  }, 5000);
}

      
// Trigger the start
$( document ).ready( function() {
  if( client_id =='' ) {
    alert( 'Please specify your keys in the source' );
  } else {
    startCapture();
  }
  $(document).keypress(function (event) {
    if (event.which > 48 && event.which < 53) {
      animateBottle(event.which - 49);
    }
  })
  $('audio').on('pause', function (target) {
    // alert('playback ended')
    $('#status').removeClass('transparent').html('Detecting ...');
    $('.beer-comment').css('display', 'none').removeClass('animated fadeIn');
    shouldSendRequest = true;
    $('.beer_container').children().css('animation-iteration-count', '1').removeClass('animated fadeOut bounce');
    $('.ico_container').css('display', 'none').removeClass('animated fadeIn');
    requestInterval = setInterval( function () {
      FACE.webcam.takePicture( "webcam_preview", "img_snapshot" );
      sendDetectRequest();
    }, 5000);
  });
});
