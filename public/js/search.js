var searchButton = document.querySelector('.btn');

// var repoList = document.querySelector('ul');

searchButton.addEventListener('click', async function (event) {
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
  var resResult = document.getElementById('miko');
  var zipcode = document.querySelector('.form-input').value;
  // });
  await fetch(`/api/google/${zipcode}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        Alert('Failed to retrieve data from Last.fm API.');
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
      window.location.replace(`/results?data=${btoa(JSON.stringify(placeDetailsResponses))}`);
      // console.log(placeDetailsResponses);

      // var html = '<h3>Here are the top 8 places you may like!</h3>'
      // if (placeDetailsResponses.length > 0) {
      //   html += '';
      //   for (var i = 0; i < 8; i++) {
      //     var name = placeDetailsResponses[i].name;
      //     var address = placeDetailsResponses[i].address;
      //     var rating = placeDetailsResponses[i].rating;
      //     var img = placeDetailsResponses[i].photoReference;
          
      //     html +=
      //   //   ` <li> 
         
      //   //   <div>
          
      //   //   <img src="${img}" alt="${name} in ${address}">
      //   //   <div>
      //   //       <h4>${name}</h4>
      //   //       <p>${address}</p>
      //   //       <p>${rating}</p>
      //   //   </div>
      
      //   //    <button type=submit class="profile" onclick="addToProfile('${name}', '${address}', '${rating}', '${img}')">Add to your favorite!</button>
           
      //   //    </div>
      //   //    </li>
      //   //    <script src ="./js/profile.js"></script>
      //   //  `
      //   `<div class ="col s3 m3">
      //   <div class="card white">
      //     <div class="card-content black-text">
      //       <span class="card-title">${name}
      //       </span>
      //       <p>${address}${rating}</p>
      //     </div>
      //     <div class="card-action">
      //       <a href="#">This is a link</a>
      //     </div>
      //     <button type=submit class="profile" onclick="addToProfile('${name}', '${address}', '${rating}', '${img}')">Add to your favorite!</button>
      //   </div>
      // </div>`
        
      //     resResult.innerHTML = html;
      //   } 
      // }
    }
    );
});


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
// });

