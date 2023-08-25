document.addEventListener("DOMContentLoaded", function () {
    const addReminderButton = document.getElementById("addReminder");
    const remindersList = document.getElementById("reminders");
    const notificationSound = document.getElementById("notificationSound");
  
    addReminderButton.addEventListener("click", function () {
      const medicationName = document.getElementById("medicationName").value;
      const medicationTime = document.getElementById("medicationTime").value;
  
      if (medicationName && medicationTime) {
        const reminderItem = document.createElement("li");
        reminderItem.textContent = `${medicationName} - ${medicationTime}`;
        remindersList.appendChild(reminderItem);
  
        // Clear input fields
        document.getElementById("medicationName").value = "";
        document.getElementById("medicationTime").value = "";
  
        // Set a notification for the medication time
        setMedicationNotification(medicationName, medicationTime);
      }
    });
  
    function setMedicationNotification(medicationName, medicationTime) {
      const now = new Date();
      const selectedTime = new Date(now.toDateString() + " " + medicationTime);
  
      if (selectedTime > now) {
        const timeUntilMedication = selectedTime - now;
  
        setTimeout(function () {
          if (Notification.permission === "granted") {
            const notification = new Notification("Medication Reminder", {
              body: `It's time to take your ${medicationName}.`,
              icon: "bell.png", // Replace with your notification icon
            });
  
            // Play the notification sound
            notificationSound.play();
          }
        }, timeUntilMedication);
      }
    }
  
    // Request permission for notifications on page load
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  });
  
  