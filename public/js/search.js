
var searchButton = document.querySelector('.btn');

// var repoList = document.querySelector('ul');

searchButton.addEventListener('click', async function (event) {
  event.preventDefault();
 
  var resResult = document.getElementById('miko');
var zipcode = document.querySelector('.form-input').value

   await fetch(`/api/google/${zipcode}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        Alert('Failed to retrieve data from Last.fm API.');
      }
    })


    .then(function ({placeDetailsResponses}) {
      console.log(placeDetailsResponses);

      var html = '<h3>Here are the top 8 places you may like!</h3>'
      if (placeDetailsResponses.length > 0) {
        html += '';
        for (var i = 0; i < 8; i++) {
          var name = placeDetailsResponses[i].name;
          var address = placeDetailsResponses[i].address;
          var rating = placeDetailsResponses[i].rating;
          var img = placeDetailsResponses[i].photoReference;
          name.replace("'", "&lsquo;")
          console.log(name);
          html +=
          `
        <div class ="col s3 m3">
        <div class="card white">
          <div class="card-content black-text">
            <span class="card-title">${name} 
            </span>
            <p>Address: ${address}</p>
            <p>Rating: ${rating}</p>
           
    
          </div>
          <div class="card-action">
            <a href="#">This is a link</a>
          </div>
          <button type=submit class="profile" onclick="addToProfile('${name.replace("'", "&lsquo;")}', '${address}', '${rating}', '${img}')">Add to your favorite!</button>
        </div>
      </div>`
        
          resResult.innerHTML = html;
         
        } 

      }
      
    }
    )

  })


// if (!navigator.geolocation) {
//   console.error('Your browser doesn\'t support Geolocation');
// } else {
//   console.log('OK!');A;
// }
  
// navigator.geolocation.getCurrentPosition(success, error);
  
// function success(position) {
//   const { latitude, longitude } = position.coords;
  
//   console.log(`lat: ${latitude} lon ${longitude}`);
// }
  
// function error() {
//   console.log('something failed');
// }

// const searchButton = document.querySelector('search-btn');



// searchButton.addEventListener('click', function(){
//   var position = document.getElementById('food-search').value;

//   fetch('/api/google')

  // var axios = require('axios');

  // var config = {
  //   method: 'get',
  //   url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position}&radius=1500&type=restaurant&keyword=cruise&key=${MAPS_API_KEY}'`
  //   headers: { }
  // };
    
  // axios(config)
  // .then(function (response) {
  //   console.log(JSON.stringify(response.data));
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
// });

