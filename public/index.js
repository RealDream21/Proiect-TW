  function EventTracker () {
    const reminderDateInput = document.getElementById('reminder-date');
    const reminderNameInput = document.getElementById('reminder-name');
    const addReminderButton = document.getElementById('add-reminder');
    const reminderList = document.getElementById('reminder-list');
    const upcomingList = document.getElementById('upcoming-list');
  
    addReminderButton.addEventListener('click', function(event) {
      event.preventDefault();
  
      const reminderDate = new Date(reminderDateInput.value);
      const reminderName = reminderNameInput.value;
      if (reminderName.trim() === '') {
        alert('Nu ai introdus un nume pentru reminder!');
        return;
      }
  
      const reminderItem = document.createElement('li');
      reminderItem.classList.add('reminder-item');
      const reminderDateSpan = document.createElement('span');
      reminderDateSpan.textContent = reminderDate.toDateString() + " ";
      const reminderNameSpan = document.createElement('span');
      reminderNameSpan.textContent = reminderName + " ";
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', function() {
        reminderItem.remove();
      });

      if (reminderDate.toString() === "Invalid Date") {
        alert('Data introdusa nu este valida!');
        return;
      }
  
      reminderItem.appendChild(reminderDateSpan);
      reminderItem.appendChild(reminderNameSpan);
      reminderItem.appendChild(removeButton);
      reminderList.appendChild(reminderItem);
  
      const today = new Date();
      const diffTime = Math.abs(reminderDate - today);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 7) {
        const toAdd = reminderItem.cloneNode(true);
        upcomingList.appendChild(toAdd);
        toAdd.querySelector('button').addEventListener('click', function() {
          toAdd.remove();
        });
      }
  
      reminderNameInput.value = '';
    });
  };

  function NewsLetterManager () {
    const newsletterForm = document.getElementById('newsletter');
    const newsLabelInputs = document.getElementsByClassName('news_label');
  
    newsletterForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const formData = {};
      for (let i = 0; i < newsLabelInputs.length; i++) {
        const input = newsLabelInputs[i];
        formData[input.name] = input.value;
      }

      console.log(formData);

      const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex_email.test(formData['myEmail'])) {
        alert('Email-ul introdus nu este valid!');
        return;
      }

      localStorage.setItem('newsletterFormData', JSON.stringify(formData));
  
      alert('Te-ai abonat cu succes la newsletter!');
  
      newsletterForm.reset();
    });
  
    const savedFormData = JSON.parse(localStorage.getItem('newsletterFormData'));
    if (savedFormData) {
      for (let i = 0; i < newsLabelInputs.length; i++) {
        const input = newsLabelInputs[i];
        input.value = savedFormData[input.name] || '';
      }
    }
  };

  function ResetAnimation(){
    const title = document.getElementById('titlu');
    window.addEventListener('keyup', function(event){
      if(event.key === 'ArrowUp'){
        title.style.animation = 'none';
        title.offsetWidth;
        title.style.animation = null;
      }
    });
  }

  function RandomTitleLetters () {
    const originalColor = document.getElementById('titlu').style.color;
    const title = document.getElementById('titlu');
    const titleText = title.textContent;
    const titleLetters = titleText.split('');
    const titleLettersElements = titleLetters.map(letter => {
      const span = document.createElement('span');
      span.textContent = letter;
      return span;
    }
    );
    title.innerHTML = '';
    titleLettersElements.forEach(letter => title.appendChild(letter));
    setInterval(() => {
      const index = Math.floor(Math.random() * titleLettersElements.length);
      const randomLetter = titleLettersElements[index];
      randomLetter.style.color = 'white';
      setTimeout(() => {
        randomLetter.style.color = originalColor;
      }, 1000);
    }, 800);
  };

  window.onload = () => {
    EventTracker();
    NewsLetterManager();
    RandomTitleLetters();
    ResetAnimation();
    console.log('loaded');
  }

