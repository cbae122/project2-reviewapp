async function addToProfile(name, address, rating) {


  const response = await fetch('/api/place', {
    method: 'POST',
    body: JSON.stringify({
      name,
      address,
      rating,
        
        
        
        
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (response.ok) {
    alert('Added to your favorite! Please go to your profile to review this place');
  } else {
    alert('Please login to continue');
  }
  console.log(address);
}
 