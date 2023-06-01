var repoList = document.getElementById('res-results');
var fetchButton = document.getElementById('btn');
var final = [];
var apikey = 'AIzaSyCppntGd7uA7jU_xH_ocsTMXk4oXh_fIZI';

function getApi() {
  // replace `octocat` with anyone else's GitHub username
  var requestUrl = 'https://api.github.com/users/octocat/repos';



   fetch(requestUrl)
    .then(function (response) {
      return response.json();
      
    })
    .then(function (data) {
      console.log(data)
      // console.log(final);
      for (var i = 0; i < data.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = data[i].html_url;
        repoList.appendChild(listItem);
        

      }
    //   final.push(data);
      

    });
   
}


// console.log(final);

fetchButton.addEventListener('click', getApi);