var searchButton = document.querySelector('.btn');

// var repoList = document.querySelector('ul');

searchButton.addEventListener('click', async function (event) {
  event.preventDefault();
 
  var resResult = document.getElementById('miko');
  var zipcode = document.querySelector('.form-input').value;

  await fetch(`/api/google/${zipcode}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        Alert('Failed to retrieve data from Last.fm API.');
      }
    })


    .then(function ({placeDetailsResponses}) {
      // window.location.replace(`/results?data=${btoa(JSON.stringify(placeDetailsResponses))}`);
      // console.log(placeDetailsResponses);

      var html = '<h3>Here are the top 8 places you may like!</h3>';
      if (placeDetailsResponses.length > 0) {
        html += '';
        for (var i = 0; i < 8; i++) {
          var name = placeDetailsResponses[i].name;
          var address = placeDetailsResponses[i].address;
          var rating = placeDetailsResponses[i].rating;
          var img = placeDetailsResponses[i].photoReference;
          name.replace('\'', '&lsquo;');
          console.log(name);
          html +=
          html +=
          `
          <div class="col s3 m3">
            <div class="card white">
              <div class="card-content black-text">
                <span class="card-title">${name}</span>
                <p>Address: ${address}</p>
                <p>Rating: ${rating}</p>
              </div>
              <div class="card-image">
                <img src="data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(img)))}" alt="${name}">
              </div>
              <div class="card-action">
                <a href="#">This is a link</a>
              </div>
              <button type="submit" class="profile" onclick="addToProfile('${name.replace('\'', '&lsquo;')}', '${address}', '${rating}', '${img}')">Add to your favorite!</button>
            </div>
          </div>
          `;
        
          resResult.innerHTML = html;
          
        } 

      }
      
    }
    );
});

var ratingRes = document.getElementById('miko');
rating = yellow = (Math.round(3*2)/2).toFixed(1);
white = 5 - rating;
var output = '<div title="'+rating+'">';

//output full yellow stars
while (yellow >= 1) {
  output += '<i class="fa fa-star text-yellow"></i>';
  yellow--;
}
//what is left can either be .5 or 0... if .5 output half yellow star
if (yellow == .5) {
  output += '<i class="fa fa-star-half-o text-yellow"></i>';
}
//output remaining full white stars
while (white >= 1) {
  output += '<i class="fa fa-star-o text-yellow"></i>';
  white--;
}
output += '</div>';
ratingRes.innerHTML = output;



if (!navigator.geolocation) {
  console.error('Your browser doesn\'t support Geolocation');
} else {
  console.log('OK!');A;
}
  
navigator.geolocation.getCurrentPosition(success, error);
  
function success(position) {
  const { latitude, longitude } = position.coords;
  
  console.log(`lat: ${latitude} lon ${longitude}`);
}
  
function error() {
  console.log('something failed');
}


