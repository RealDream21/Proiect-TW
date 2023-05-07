document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const photoInput = document.getElementById('photoInput');
    const imageGallery = document.getElementById('imageGallery');
  
    uploadForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append('photo', photoInput.files[0]);
  
      fetch('/upload', {
        method: 'POST',
        body: formData
      })
        .then(response => response.text())
        .then(message => {
          console.log(message);
          displayImage(photoInput.files[0]);
        })
        .catch(error => {
          console.error(error);
        });
    });
  
    function displayImage(file) {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
  
      const image = document.createElement('img');
      image.src = URL.createObjectURL(file);
  
      imageContainer.appendChild(image);
      imageGallery.appendChild(imageContainer);
    }
  });
  