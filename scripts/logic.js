//FOR JAVASCRIPT DEMONSTRATION PURPUSES ONLY, NEVER DISCLOSE YOUR KEYS TO THIRD PARTIES!
      
var client_id = '';
      
var app_key   = '';

var ajaxRequest = new XMLHttpRequest();

function success( result ) {

        if( result.persons.length > 0 ) {

          age        = result.persons[0].age.value;
          
	  gender     = result.persons[0].gender.value;
          
	  confidence = result.persons[0].gender.confidence;
         
          
		if ( gender == "Male" && confidence > 50  && confidence % 2 == 1)
            { $('#advertisement').attr( 'src', 'introBud.gif' );
		ajaxRequest.open("GET", "http://172.20.10.4:3000/open", true);
		ajaxRequest.send();
	    }
          
		else if ( gender == "Female" && confidence > 50 && confidence % 2 == 1)
            { $('#advertisement').attr( 'src', 'introBud.gif' );
                ajaxRequest.open("GET", "http://172.20.10.4:3000/open", true);
                ajaxRequest.send();
            }

		else if ( gender == "Male" && confidence > 50 && confidence % 2 == 0)
            { $('#advertisement').attr( 'src', 'introBud.gif' );
                ajaxRequest.open("GET", "http://172.20.10.4:3000/open", true);
                ajaxRequest.send();
            }
  
		else if ( gender == "Female" && confidence > 50 && confidence % 2 == 0)
            { $('#advertisement').attr( 'src', 'introBud.gif' );
                ajaxRequest.open("GET", "http://172.20.10.4:3000/open", true);
                ajaxRequest.send();
            }

		else $('#advertisement').attr( 'src', 'generic.jpeg' )
	}
}
  
      

function failure( error ) {

        alert( error );
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
        
setInterval( function()
        {

          FACE.webcam.takePicture( "webcam_preview", "img_snapshot" );
          
sendDetectRequest();
        },
        7000 );
      }

      
// Trigger the start
      $( document ).ready( function() {
        if( client_id =='' ) {
          alert( 'Please specify your keys in the source' );
        } else {
          startCapture();
        }
      });
