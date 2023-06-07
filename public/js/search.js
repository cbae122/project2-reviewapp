var searchButton = document.querySelector('.btn');
var starRating = [];

searchButton.addEventListener('click', async function (event) {
  event.preventDefault();
 
  var resResult = document.getElementById('miko');
  var zipcode = document.querySelector('.form-search').value;

  await fetch(`/api/google/${zipcode}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        Alert ('Failed to retrieve data from Last.fm API.');
      }
    })


    .then(function ({placeDetailsResponses}) {


      var html = '<h3 class="center-align amber-text text-lighten-2">Here are the top 8 places you may like!</h3>';
      if (placeDetailsResponses.length > 0) {
        
        html += '';
        for (var i = 0; i < 8; i++) {
          var name = placeDetailsResponses[i].name;
          var address = placeDetailsResponses[i].address;
          var rating = placeDetailsResponses[i].rating;
          var img = placeDetailsResponses[i].photoReference;
          name.replace('\'', '&lsquo;');
    
          html +=
          `
        <div class ="col s12 m6 l3">
        <div class="card white">
          <div class="card-content black-text frame">
          <div class="card-image">
                <img src="data:image/jpeg;base64,${img}" alt="${name}">
              </div> 
          <span class="card-title">${name} 
            </span>
            <p>Address: ${address}</p>
            <p class="Srating">Rating: ${rating}
           
            <span class="material-symbols-outlined">
verified
</span>
           
            
            </p>
           <div>
           <a href= "http://google.com/maps/place/${address.replace(' ', '+')}" target="_blank">Get Direction<span class="material-symbols-outlined">
           navigation
           </span></a>
           </div>
    
          </div>
         
          <button type=submit class="profile" onclick="addToProfile('${name.replace('\'', '&lsquo;')}', '${address}', '${rating}', '${img}')">Add to your favorite!</button>
        </div>
      </div>`;
        
          resResult.innerHTML = html;
         
       
        

            
              
              
      
              
       
        }
      }   
    }
    );
});
 

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
