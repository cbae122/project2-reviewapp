async function addToProfile(name, address, rating, comment ) {
const comment = document.querySelector('.add-comment').value

const response = await fetch(`/api/place`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        address,
        rating,
        comment
        
        
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
    console.log(address);
  }
  