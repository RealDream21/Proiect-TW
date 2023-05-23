  function renderReminders(){
    const reminderList = document.getElementById('reminder-list');
    const upcomingList = document.getElementById('upcoming-list');
    const reminderItem = JSON.parse(localStorage.getItem('reminders'));

    while (reminderList.firstChild) {
      reminderList.removeChild(reminderList.firstChild);
    }
    while(upcomingList.firstChild){
      upcomingList.removeChild(upcomingList.firstChild);
    }

    for(let i in reminderItem){
      const newReminder = document.createElement('li');
      newReminder.classList.add('reminder-item');
      const reminderDateSpan = document.createElement('li');
      reminderDateSpan.textContent = reminderItem[i].reminderDate + " ";
      const reminderNameDiv = document.createElement('span');
      reminderNameDiv.style.textAlign = "center";
      reminderNameDiv.textContent = reminderItem[i].reminderName + " ";
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Sterge';
      removeButton.style.background = "pink";
      removeButton.addEventListener('click', function() {
        newReminder.remove();
        const localStorageReminders = JSON.parse(localStorage.getItem('reminders'));
        let newReminders = localStorageReminders.filter((reminder, j) => {
          if(reminder.reminderName === reminderItem[i].reminderName && reminder.reminderDate === reminderItem[i].reminderDate){
            return false;
          }
          return true;
          });
        localStorage.setItem('reminders', JSON.stringify(newReminders));
        });
        newReminder.appendChild(reminderDateSpan);
        newReminder.appendChild(reminderNameDiv);
        newReminder.appendChild(removeButton);
        reminderList.appendChild(newReminder);
        
        const today = new Date();
        const reminderDate = new Date(reminderItem[i].reminderDate);
        const differenceInTime = reminderDate.getTime() - today.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        if(differenceInDays <= 7 && differenceInDays >= 0){
          const newUpcomingReminder = document.createElement('li');
          newUpcomingReminder.classList.add('reminder-item');
          const upcomingReminderDateSpan = document.createElement('li');
          upcomingReminderDateSpan.textContent = reminderItem[i].reminderDate + " ";
          const upcomingReminderNameDiv = document.createElement('span');
          upcomingReminderNameDiv.style.textAlign = "center";
          upcomingReminderNameDiv.textContent = reminderItem[i].reminderName + " ";
          const removeButton = document.createElement('button');
          removeButton.textContent = 'Sterge';
          removeButton.style.background = "pink";
          removeButton.addEventListener('click', function() {
            newUpcomingReminder.remove();
            const localStorageReminders = JSON.parse(localStorage.getItem('reminders'));
            let newReminders = localStorageReminders.filter((reminder, j) => {
              if(reminder.reminderName === reminderItem[i].reminderName && reminder.reminderDate === reminderItem[i].reminderDate){
                return false;
              }
              return true;
              });
            localStorage.setItem('reminders', JSON.stringify(newReminders));
            });
            newUpcomingReminder.appendChild(upcomingReminderDateSpan);
            newUpcomingReminder.appendChild(upcomingReminderNameDiv);
            newUpcomingReminder.appendChild(removeButton);
            upcomingList.appendChild(newUpcomingReminder);
        }
      }
    };

  function EventTracker () {
    const reminderDateInput = document.getElementById('reminder-date');
    const reminderNameInput = document.getElementById('reminder-name');
    const addReminderButton = document.getElementById('add-reminder');
  
    addReminderButton.addEventListener('click', function(event) {
      event.preventDefault();
      const sendButton = document.getElementById('add-reminder');
      const initialColor = sendButton.style.color;
      sendButton.style.color = 'blue';

      setTimeout(function(){
        sendButton.style.color = initialColor;
      }, 1000);
  
      const reminderDate = new Date(reminderDateInput.value);
      const reminderName = reminderNameInput.value;
      if (reminderName.trim() === '') {
        alert('Nu ai introdus un nume pentru reminder!');
        return;
      }

      if (reminderDate.toString() === "Invalid Date") {
        alert('Data introdusa nu este valida!');
        return;
      }

      const reminderItem = {
        reminderDate: reminderDate.toDateString(),
        reminderName: reminderName,
      };
      let storedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
      storedReminders.push(reminderItem);
      localStorage.setItem('reminders', JSON.stringify(storedReminders));

      reminderNameInput.value = '';
      renderReminders();
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
    renderReminders();
    EventTracker();
    NewsLetterManager();
    RandomTitleLetters();
    ResetAnimation();
  }

