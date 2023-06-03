const newFormHandler = async (event) => {

  event.preventDefault();
  
  const name = document.querySelector('#restaurant-name').value.trim();
  const review = document.querySelector('#restaurant-review').value.trim();
  
  if (name && review) {
    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify({ name, review }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};
  
document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);
