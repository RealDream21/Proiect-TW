document.addEventListener('DOMContentLoaded', function() {
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
        alert('Please enter a reminder name.');
        return;
      }
  
      const reminderItem = document.createElement('li');
      reminderItem.classList.add('reminder-item');
      const reminderDateSpan = document.createElement('span');
      reminderDateSpan.textContent = reminderDate.toDateString();
      const reminderNameSpan = document.createElement('span');
      reminderNameSpan.textContent = reminderName;
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', function() {
        reminderItem.remove();
      });
  
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
  });
  