// checks if the browser supports the Geolocation API
if (!navigator.geolocation) {
  console.error('Your browser doesn\'t support Geolocation');
} else {
  console.log('OK!');
}
navigator.geolocation.getCurrentPosition(success, error);
function success(position) {
  const { latitude, longitude } = position.coords;
  console.log(`lat: ${latitude} lon ${longitude}`);
}
function error() {
  console.log('something failed');
}
var searchButton = document.querySelector('.btn');
// var repoList = document.querySelector('ul');
searchButton.addEventListener('click', function (event) {
  event.preventDefault();
  //   var name = document.getElementById('food-search').value;
  // var address =
  // fetch('/api/google')
  // .then(function (response) {
  //   return response.json();
  // })
  // .then(function (data) {
  //   // console.log(final);
  //   for (var i = 0; i < 4 ; i++) {
  //     var listItem = document.createElement('li');
  //     listItem.textContent = data[i].name;
  //     listItem.textContent = data[i].address;
  //     listItem.textContent = data[i].rating;
  //     repoList.appendChild(listItem);
  //   }
  //   final.push(data);()
  var resResult = document.getElementById('res-results');
  var zipcode = document.querySelector('.form-input').value;
  // });
  fetch(`/api/google/${zipcode}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert('Failed to retrieve data from Last.fm API.');
      }
    })
    // .catch(function (error) {
    //     Alert('An error occurred while fetching data from Last.fm API.');
    // });
    // placeDetailsResponses.forEach(function (data) {})
    // catch (function (err) {
    //   console.log(err);
    // })
    .then(function ({placeDetailsResponses}) {
      console.log(placeDetailsResponses);
      var html = '<h3>Here are the top 8 places you may like!</h3>';
      if (placeDetailsResponses.length > 0) {
        html += '';
        for (var i = 0; i < 8; i++) {
          var name = placeDetailsResponses[i].name;
          var address = placeDetailsResponses[i].address;
          var rating = placeDetailsResponses[i].rating;
          var img = placeDetailsResponses[i].photoReference;
          html +=
          ` <li>
          <img src=${img}>
          <div>
          <h1>${name}<h1>
          <p>Address: ${address}<p>
           <p>Rating: ${rating}<p>
           <input placeholder='Let us know your thought about this place!'></input>
           <button type=submit class="profile">Add</button>
           </div>
           </li>
         `;
          resResult.innerHTML = html;
        }
      }
    }
    );
}
  
);