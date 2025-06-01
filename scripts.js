document.addEventListener("DOMContentLoaded", function () {
     

    //code for index page
    
        const destination = document.getElementById("destination-options");
        const date1 = document.getElementById("date-picker1");
        const date2 = document.getElementById("date-picker2");
        const guests = document.getElementById("guests");
        const ratesButton = document.getElementById("rates-button");
    
        const todaysDate = new Date().toISOString().split('T')[0]; //.toISOString() converts the date to a string in ISO format (e.g., 2023-10-05T12:34:56.789Z).
                                                                    //.split('T')[0] splits the string at the T and takes the first part, which is just the date (2023-10-05)
    
      if (date1 && date2) {
        // Set the minimum check-in date to today
        const todaysDate = new Date().toISOString().split("T")[0];
        date1.setAttribute("min", todaysDate);
    
        // Update the minimum checkout date when the check-in date changes
        date1.addEventListener("change", () => {
            const checkInDate = new Date(date1.value); // Get the selected check-in date
            const minCheckOutDate = new Date(checkInDate);
            minCheckOutDate.setDate(checkInDate.getDate() + 1); // Set min checkout date to the next day
    
            // Format the minimum checkout date as YYYY-MM-DD
            const minCheckOutDateString = minCheckOutDate.toISOString().split("T")[0];
    
            // Update the min attribute of the checkout date picker
            date2.setAttribute("min", minCheckOutDateString);
    
            // If the current checkout date is before the new minimum, reset it
            if (new Date(date2.value) < minCheckOutDate) {
                date2.value = minCheckOutDateString;
            }
        });
    }
    
        if (ratesButton) {
    
        ratesButton.addEventListener("click", (e) => {
                    e.preventDefault();
                if (destination.value === "") {
                    alert("Please select a designation to proceed.")
                } else if (date1.value === "" || date2.value === "") {
                    alert("Please select both check-in and check-out dates to proceed with checking rates.")
                } else if (guests.value === "") {
                    alert("Please select the number of guests to proceed with checking rates.")
                } else {
                    window.location.href = "rooms.html"
                }
    
                totalDates.textContent = `${formattedDate1} - ${formattedDate2}`;
        })
        
        }
    
                    
    
    // Save selected destination and dates to localStorage (on the index page)
    if (window.location.pathname.includes("index.html")) {
        const destinationOptions = document.getElementById("destination-options");
        const datePicker1 = document.getElementById("date-picker1");
        const datePicker2 = document.getElementById("date-picker2");
    
        if (destinationOptions) {
            destinationOptions.addEventListener("change", () => {
                localStorage.setItem("selectedDestination", destinationOptions.value); //This stores the selected destination value in the browser's localStorage under the key selectedDestination.
            });
        }
    
        if (datePicker1 && datePicker2) {
            datePicker1.addEventListener("change", () => {
                localStorage.setItem("checkInDate", datePicker1.value);
            });
    
            datePicker2.addEventListener("change", () => {
                localStorage.setItem("checkOutDate", datePicker2.value);
            });
        }
    }
    
    // Retrieve and display destination and dates (on the rooms page)
    if (window.location.pathname.includes("rooms.html")) {
        const selectedDestination = localStorage.getItem("selectedDestination");
        const checkInDate = localStorage.getItem("checkInDate");
        const checkOutDate = localStorage.getItem("checkOutDate");
        const destinationRooms = document.getElementById("destination-rooms");
        const totalDates = document.getElementById("total-dates");
    
        // Display selected destination under Accommodations
        if (destinationRooms && selectedDestination) {
            const formattedDestination = formatDestination(selectedDestination);
            destinationRooms.textContent = formattedDestination;
            destinationRooms.classList.add("destination-rooms");
        }
    
        // Display selected dates in the shopping cart
        if (totalDates && checkInDate && checkOutDate) {
            const formattedCheckIn = formatDate(checkInDate);
            const formattedCheckOut = formatDate(checkOutDate);
            totalDates.textContent = `${formattedCheckIn} - ${formattedCheckOut}`;
            totalDates.style.color = "#FF8A00";
            totalDates.style.fontSize = "24px";
        }
    }
    
    // Function to format destination for display
    function formatDestination(destination) {
        const destinationMap = {
            "mexico": "Mexico",
            "dominican-republic": "Dominican Republic",
            "puerto-rico": "Puerto Rico",
            "st-lucia": "St. Lucia",
            "bahamas": "Bahamas",
        };
        return destinationMap[destination] || "Unknown Destination";
    
        console.log(formatDestination("mexico")); // Output: "Mexico"
        console.log(formatDestination("st-lucia")); // Output: "St. Lucia"
        console.log(formatDestination("jamaica")); // Output: "Unknown Destination"
    }
    
    // Function to format date (without 2-digit year)
    function formatDate(dateString) {
        const date = new Date(dateString); //creates a JavaScript Date object from the input dateString
        date.setDate(date.getDate() + 1);
        const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits for day
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits for month
        const year = date.getFullYear(); // Full 4-digit year
        return `${month}/${day}/${year}`; // Format as MM/DD/YYYY
    
        console.log(formatDate("2023-10-05")); // Output: "10/05/2023"
        console.log(formatDate("2023-01-12")); // Output: "01/12/2023"
        console.log(formatDate("2023-12-01")); // Output: "12/01/2023"
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
        // code for the calendar in activies page //
      
       const activitiesDropdown = document.getElementById('activities-dropdown'); 
       const calendar = document.getElementById('calendar');
       const currentMonthElement = document.getElementById('current-month');
       const prevMonthButton = document.getElementById('prev-month');
       const nextMonthButton = document.getElementById('next-month');
       const datesElement = document.getElementById('dates');
       const activityReservation = document.getElementById('activity-reservation');
    
     
    
        if (calendar && prevMonthButton && nextMonthButton) {
       
       
       
       let currentDate = new Date(); // 
       let selectedDateElement = null; // Tracks the currently selected date
       
       
       function renderCalendar() {
           const year = currentDate.getFullYear();
           const month = currentDate.getMonth();
           const monthName = currentDate.toLocaleString('default', { month: 'long' });
           const firstDayOfMonth = new Date(year, month, 1);
           const lastDayOfMonth = new Date(year, month + 1, 0); //By setting the day to 0 of the following month (month + 1), JavaScript returns the last day of the current month.
           const daysInMonth = lastDayOfMonth.getDate();
           const startingDay = firstDayOfMonth.getDay();
       
       
           
           currentMonthElement.textContent = `${monthName} ${year}`;
       
           
           datesElement.innerHTML = ''; // reset so that when you change months, old dates are removed before new ones are added.
       
       
           //This ensures that the first day of the month starts on the correct weekday in the grid.
           for (let i = 0; i < startingDay; i++) {
               datesElement.appendChild(document.createElement('div')); //Without these empty cells, the dates wouldn’t line up properly with the days of the week.
           }
       
           // Add divs for each day of the month
           for (let day = 1; day <= daysInMonth; day++) {
               const dateElement = document.createElement('div'); //Please note the difference between dateElement and date(s)Element
               dateElement.textContent = day;
               dateElement.dataset.day = day; //creates a custom data attribute on the dateElement & sets the value of this attribute to be the value of day
       
       
               const currentDay = new Date(year, month, day);
               if (currentDay < new Date().setHours(0, 0, 0, 0)) { //time set to midnight
                   dateElement.classList.add('inactive-date');
               } else {
                   const timeSlots = document.createElement('div');
                   timeSlots.className = 'time-slots';
                   dateElement.appendChild(timeSlots);
                   dateElement.addEventListener('click', () => handleDateClick(dateElement, timeSlots));
               }
       
               datesElement.appendChild(dateElement);
           }
       }
       
      
      
       function handleDateClick(dateElement, timeSlots) {
       
       
           // This block loops through all child elements (each date cell) within the parent datesElement
           Array.from(datesElement.children).forEach(child => { 
               if (child !== dateElement) {
                   child.style.display = 'none';
               }
           });
       
       
           // Show the time slots for the clicked date
           timeSlots.style.display = 'grid';
           selectedDateElement = dateElement; //The selectedDateElement is updated to reference the clicked date, allowing for later toggling.
       
       
         const selectedDay = parseInt(dateElement.dataset.day, 10); //The second argument, here 10, specifies the radix or base for the numerical conversion. In this case, 10 means that the string should be interpreted as a base-10 (decimal) number.
         const selectedDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);
         const today = new Date();
         const isToday = selectedDateObj.toDateString() === today.toDateString(); //The toDateString() method converts the date objects to a readable date string;
          
       
           // Populate time slots
           const hours = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
           timeSlots.innerHTML = ''; //Clears any previously existing content in the time slots container before adding new elements.
       
       
          hours.forEach(hour => {
               const slot = document.createElement('div');
               slot.textContent = hour;
       
       
               const timeSlotDate = new Date(selectedDateObj); //This object will be modified to represent the exact time for the current slot on the selected day.
               const [time, modifier] = hour.split(' '); //The time string is split into two parts: the time ("9:00") and the modifier ("AM").
               let [hoursValue, minutes] = time.split(':');
               hoursValue = parseInt(hoursValue, 10);
               minutes = parseInt(minutes, 10);
      
               
               if (modifier === 'PM' && hoursValue < 12) {
                   hoursValue = parseInt(hoursValue) + 12; //For PM times (except 12 PM), 12 is added to convert to 24-hour format.
               } else if (modifier === 'AM' && hoursValue === '12') {
                   hoursValue = 0;
               }
      
               
               timeSlotDate.setHours(hoursValue, minutes, 0, 0); //updates with the correct hours and minutes, while seconds and milliseconds are reset to 0.
       
                
              if (isToday) {
             const now = new Date();
             const bufferTime = now.getTime() + 15 * 60000; // 15 minutes in the future
      
      
             if (timeSlotDate.getTime() < bufferTime) {
               slot.classList.add('inactive-time');
               slot.style.pointerEvents = 'none';
             } else {
               slot.classList.remove('inactive-time');
               slot.style.pointerEvents = 'auto';
               slot.addEventListener('click', () => showReservationForm(hour, slot));
             }
      
      
           } else {
             // For any day other than today, enable all time slots
             slot.classList.remove('inactive-time');
             slot.style.pointerEvents = 'auto';
             slot.addEventListener('click', () => showReservationForm(hour, slot));
           }
       
               timeSlots.appendChild(slot);
           });
       }
       
       
       // Show reservation form
       function showReservationForm(time, slot) {
           activityReservation.innerHTML = ''; //When a valid time slot is clicked, this function clears any previous content from the reservation container.
       
           const activityForm = document.createElement('form');
       
       
           // Add activity and time labels
           const selectedActivity = activitiesDropdown.options[activitiesDropdown.selectedIndex].textContent;
           const activityLabel = document.createElement('h3');
           activityLabel.textContent = `Reserving: ${selectedActivity}`;
           activityForm.appendChild(activityLabel);
       
       
           
           const selectedDay = selectedDateElement.firstChild.textContent.trim(); // the textContent of the selectedDateElement includes all the child elements' text content, including the time slots. you need to extract only the date part from the selectedDateElement and ignore the time slots.
           const selectedMonth = currentDate.toLocaleString('default', { month: 'long' });
           const selectedYear = currentDate.getFullYear(); 
           const formattedDate = `${selectedMonth} ${selectedDay}, ${selectedYear}`;
           const dateLabel = document.createElement('p');
           dateLabel.textContent = `Selected Date: ${formattedDate}`;
           dateLabel.style.fontWeight = 'bold';
           dateLabel.style.fontSize = '16px';
           dateLabel.style.margin = '5px auto';
           activityForm.appendChild(dateLabel);
       
       
           const hourLabel = document.createElement('p');
           hourLabel.textContent = `Selected Time: ${time}`;
           hourLabel.style.fontWeight = 'bold';
           hourLabel.style.fontSize = '16px';
           hourLabel.style.color = "red";
           hourLabel.style.margin = '5px auto';
           activityForm.appendChild(hourLabel);
       
       
       
           // Add name input
           const nameLabel = document.createElement('label');
           nameLabel.textContent = 'Name: ';
           const nameInput = document.createElement('input');
           nameInput.type = 'text';
           nameInput.required = true;
           nameInput.placeholder = 'Jane Doe';
           activityForm.appendChild(nameLabel);
           activityForm.appendChild(nameInput);
       
       
           // Add room input
           const roomLabel = document.createElement('label');
           roomLabel.textContent = 'Room #: ';
           const roomInput = document.createElement('input');
           roomInput.type = 'text';
           roomInput.required = true;
           roomInput.placeholder = "1234";
           activityForm.appendChild(roomLabel);
           activityForm.appendChild(roomInput);
       
       
           // Add phone input
           const phoneLabel = document.createElement('label');
           phoneLabel.textContent = 'Phone #: ';
           const phoneInput = document.createElement('input');
           phoneInput.type = 'tel';
           phoneInput.required = true;
           phoneInput.placeholder = "###-###-####"
           activityForm.appendChild(phoneLabel);
           activityForm.appendChild(phoneInput);
       
       
           // Add email input
           const emailLabel = document.createElement('label');
           emailLabel.textContent = 'Email: ';
           const emailInput = document.createElement('input');
           emailInput.type = 'email';
           emailInput.required = true;
           emailInput.placeholder = "janedoe@gmail.com"
           activityForm.appendChild(emailLabel);
           activityForm.appendChild(emailInput);
       
       
           // Add party occupancy input
           const partyLabel = document.createElement('label');
           partyLabel.textContent = 'Party Occupancy: ';
           const partyInput = document.createElement('input');
           partyInput.type = 'number';
           partyInput.required = true;
           partyInput.max = "14"
           activityForm.appendChild(partyLabel);
           activityForm.appendChild(partyInput);
       
       
           // Add reserve button
           const reserveButton = document.createElement('button');
           reserveButton.type = 'submit';
           reserveButton.textContent = 'Reserve';
           reserveButton.className = 'reserve-button';
           activityForm.appendChild(reserveButton);
       
       
           // Add exit button
           const exitButton = document.createElement('button');
           exitButton.textContent = 'Exit';
           exitButton.className = 'exit-button';
           activityForm.appendChild(exitButton);
       
       
           // Handle form submission
           activityForm.addEventListener('submit', (e) => {
               e.preventDefault();
               const reservationData = {
                   activity: selectedActivity,
                   timeslot: slot.textContent,
                   name: nameInput.value,
                   room: roomInput.value,
                   phone: phoneInput.value,
                   email: emailInput.value,
                   party: partyInput.value,
               };
               console.log('Reservation Data:', reservationData);
               activityReservation.classList.add('hidden');
           });
       
       
           exitButton.addEventListener('click', (e) => {
               e.preventDefault();
               renderCalendar();
               activityReservation.classList.add('hidden');
           });
       
           reserveButton.addEventListener("click", (e) => {
               e.preventDefault();
       
               if (nameInput.value.length < 5) {
                   alert("Enter a valid first and last name");
               } else if (roomInput.value.length < 4) {
                   alert("Not a valid 4-digit room number");
               } else if (phoneInput.value.length < 7) {
                   alert("Not a valid 7-digit phone number");
               } else {
                   activityReservation.classList.add("hidden");
                   renderCalendar();
                   alert("Thank you for booking, you will receive a confirmation email shortly.")
               }
               
           })
       
       
           activityReservation.appendChild(activityForm);
           activityReservation.classList.remove('hidden');
       };
       
       
       prevMonthButton.addEventListener('submit', () => {
           currentDate.setMonth(currentDate.getMonth() - 1);
           renderCalendar();
       });
       
       
       nextMonthButton.addEventListener('click', () => {
           currentDate.setMonth(currentDate.getMonth() + 1);
           renderCalendar();
       });
       
       
       activitiesDropdown.addEventListener('change', () => {
           calendar.classList.remove('hidden');
           renderCalendar();
       
           if (!activityReservation.classList.contains("hidden")) {
               activityReservation.classList.add("hidden");
           }
       });
       
       
       currentMonthElement.addEventListener('click', () => {
           renderCalendar();
       });
       
       
       renderCalendar();
      
        }
    
    
    
         // code for the videos in activities page //
      
         const activitiesVideo = document.getElementById('activities-video');
    
         if (activitiesVideo) {
      
         const videos = [
              "https://cdn.pixabay.com/video/2024/12/03/244754_large.mp4", // Snorkeling
              "https://videos.pexels.com/video-files/11667472/11667472-uhd_2560_1440_25fps.mp4", // Parasailing
              "https://videos.pexels.com/video-files/5701451/5701451-uhd_2560_1440_25fps.mp4", // Paddleboarding
              "https://videos.pexels.com/video-files/30414880/13033658_2560_1440_24fps.mp4", // Jet Skiing
              "https://videos.pexels.com/video-files/5929367/5929367-uhd_2560_1440_25fps.mp4", // Beach Yoga
              "https://videos.pexels.com/video-files/20030101/20030101-uhd_2560_1440_30fps.mp4" 
         ];
        
        
         
         let currentVideoIndex = 0;
     
         
        
         
         function changeVideo() {
             currentVideoIndex = (currentVideoIndex + 1) % videos.length; 
     
             if (activitiesVideo) { // Double-checking if the video element exists
                 activitiesVideo.src = videos[currentVideoIndex];
                 activitiesVideo.load(); // Reload the video with the new source
                 activitiesVideo.play(); // Start playing the new video
             } else {
                 console.error("activitiesVideo is null, cannot update video source.");
             }
        
            
         }
         
         setInterval(changeVideo, 10000);
      
      }
    
    
    
    
    
    
    
    
    
    
    
    
      
      
      //Script for dining page
    
       let diningVideo = document.getElementById("dining-video");
    
       if (diningVideo) {
    
               const diningVideosArr = [
                   "https://videos.pexels.com/video-files/3297798/3297798-uhd_2732_1440_25fps.mp4",
                   "https://videos.pexels.com/video-files/3769033/3769033-hd_1920_1080_25fps.mp4",
                   "https://videos.pexels.com/video-files/30403007/13029751_2560_1440_60fps.mp4",
                   "https://videos.pexels.com/video-files/5101342/5101342-uhd_2560_1440_25fps.mp4",
                   "https://videos.pexels.com/video-files/4667121/4667121-uhd_2732_1440_25fps.mp4",
                   "https://videos.pexels.com/video-files/8764786/8764786-uhd_2560_1440_25fps.mp4",
                   "https://videos.pexels.com/video-files/6236340/6236340-uhd_2732_1440_24fps.mp4",
                   "https://videos.pexels.com/video-files/4694341/4694341-uhd_2732_1440_25fps.mp4",
               ];
       
           let currentDiningIndex = 0;
    
           function changeDiningVideo() {
                  
                   currentDiningIndex = (currentDiningIndex + 1) % diningVideosArr.length;
                   diningVideo.src = diningVideosArr[currentDiningIndex];
                   diningVideo.load();
                   diningVideo.play();
           }
    
           setInterval(changeDiningVideo, 7000);
       
       }
    
      
      
      const restaurantWrapper = document.getElementById("restaurant-wrapper");
       const restaurantListNumber = document.getElementById("list-number");
       const prevDiningButton = document.getElementById("prev-dining-button");
       const nextDiningButton = document.getElementById("next-dining-button");
    
       if (restaurantWrapper && prevDiningButton && nextDiningButton) {
       
    const restaurants = [
       {
           name: "Ocean Breeze Grill",
           img:  "https://images.pexels.com/photos/31029412/pexels-photo-31029412/free-photo-of-beachside-dining-in-phuket-with-tropical-delights.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
           bio1: 'Seaside Elegance Meets Fresh Flavor.',
           bio2: 'Dine with your toes in the sand at Ocean Breeze Grill, our beachfront haven specializing in fresh seafood and tropical-inspired dishes.'
       },
       {
           name: "The Flame & Vine",
           img: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
           bio1: 'A Culinary Journey of Fire and Flavor.',
           bio2: 'Experience the art of open-fire cooking at The Flame & Vine, our rustic-chic steakhouse.'
       },
       {
           name: "Golden Harvest Bistro",
           img: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
           bio1: 'Farm-to-Table Freshness.',
           bio2: 'Savor seasonal, organic dishes crafted from locally grown produce at Golden Harvest Bistro.'
       },
       {
           name: "Saffron Spice Kitchen",
           img: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
           bio1: 'A Taste of India.',
           bio2: 'Explore the rich and aromatic flavors of Indian cuisine at Saffron Spice Kitchen.'
       },
       {
           name: "The Rustic Table",
           img: "https://images.pexels.com/photos/31064162/pexels-photo-31064162/free-photo-of-gourmet-lamb-chops-with-vegetables-and-gravy.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
           bio1: 'Comfort Food with a Modern Twist.',
           bio2: 'Enjoy hearty, artisanal dishes in a cozy, rustic setting at The Rustic Table.'
       },
       {
           name: "La Dolce Vita Trattoria",
           img: "https://images.pexels.com/photos/1093015/pexels-photo-1093015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
           bio1: 'Authentic Italian Flavors.',
           bio2: 'Indulge in handmade pasta, wood-fired pizzas, and classic desserts at La Dolce Vita Trattoria.'
       },
       {
           name: "Green Leaf Vegan Cafe",
           img: "https://images.pexels.com/photos/434258/pexels-photo-434258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
           bio1: 'Plant-Based Delights.',
           bio2: 'Discover a world of vibrant, healthy vegan dishes at Green Leaf Vegan Cafe.'
       },
       {
           name: "The Smoky Oak BBQ Joint",
           img: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
           bio1: 'True American BBQ.',
           bio2: 'Savor slow-smoked meats and tangy sauces at The Smoky Oak BBQ Joint.'
       },
       {
           name: "Cafe Lumière",
           img: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
           bio1: 'Artisanal Coffee & Light Bites.',
           bio2: 'Relax with a latte and freshly baked pastries at Cafe Lumière.'
       },
       {
           name: "Bamboo Garden Asian Fusion",
           img: "https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
           bio1: 'A Fusion of Asian Flavors.',
           bio2: 'Experience a blend of Chinese, Thai, and Japanese cuisines at Bamboo Garden.'
       },
       {
           name: "The Urban Vineyard",
           img: "https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
           bio1: 'Wine & Gourmet Small Plates.',
           bio2: 'Pair fine wines with artisanal charcuterie at The Urban Vineyard.'
       },
       {
           name: "The Salty Pelican Bar",
           img: "https://images.pexels.com/photos/10833363/pexels-photo-10833363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
           bio1: 'Tropical Drinks & Ocean Views.',
           bio2: 'Unwind at The Salty Pelican Bar, where refreshing cocktails and stunning sunsets meet the sound of crashing waves.'
       },
    ];
       
    const visibleCards = 6;
    
        // Duplicate the first and last few cards for seamless transition
        const duplicatedRestaurants = [
            ...restaurants.slice(-visibleCards), // Add the last few cards to the beginning
            ...restaurants, // Original array
            ...restaurants.slice(0, visibleCards), // Add the first few cards to the end
        ];
    
        // Start at the middle of the duplicated array (first original card)
        let currentRestaurantIndex = visibleCards;
    
        function renderRestaurants() {
            const restaurantCount = restaurants.length;
            const totalCards = duplicatedRestaurants.length;
    
            // Clear the wrapper
            restaurantWrapper.innerHTML = "";
    
            // Create the restaurant divs for each card
            duplicatedRestaurants.forEach((restaurant, index) => {
                const restaurantDiv = document.createElement("div");
                restaurantDiv.classList.add("restaurant-div");
    
                const restaurantPic = document.createElement("img");
                restaurantPic.src = restaurant.img;
                restaurantPic.alt = restaurant.name;
                restaurantPic.classList.add("restaurant-pic");
    
                const restaurantName = document.createElement("h1");
                restaurantName.textContent = restaurant.name;
                restaurantName.classList.add("restaurant-name");
    
                const restaurantHr = document.createElement("hr");
                restaurantHr.classList.add("restaurant-hr");
    
                const restaurantBio1 = document.createElement("p");
                restaurantBio1.textContent = restaurant.bio1;
                restaurantBio1.classList.add("restaurant-bio1");
    
                const restaurantBio2 = document.createElement("p");
                restaurantBio2.textContent = restaurant.bio2;
                restaurantBio2.classList.add("restaurant-bio2");
    
                restaurantDiv.appendChild(restaurantPic);
                restaurantDiv.appendChild(restaurantName);
                restaurantDiv.appendChild(restaurantHr);
                restaurantDiv.appendChild(restaurantBio1);
                restaurantDiv.appendChild(restaurantBio2);
    
                restaurantWrapper.appendChild(restaurantDiv);
            });
    
            // Calculate the card width based on the number of visible cards
            const cardWidth = 100 / visibleCards; // Each card takes up equal space
    
            // Calculate the offset to center the current restaurant
            const offset = currentRestaurantIndex * -cardWidth;
    
            // Apply transform to the wrapper to create the circular carousel effect
            restaurantWrapper.style.transform = `translateX(${offset}%)`;
            
        }
    
        function nextRestaurant() {
            currentRestaurantIndex = (currentRestaurantIndex + 1) % duplicatedRestaurants.length; // Circular wrap
            if (currentRestaurantIndex === duplicatedRestaurants.length - visibleCards) {
                // If we reach the end of the duplicated array, reset to the start of the original array
                currentRestaurantIndex = visibleCards;
                restaurantWrapper.style.transition = "none"; // Disable transition for instant reset
                renderRestaurants();
                setTimeout(() => {
                    restaurantWrapper.style.transition = "transform 0.5s ease-in-out"; // Re-enable transition
                }, 0);
            } else {
                renderRestaurants();
            }
        }
    
        function prevRestaurant() {
            currentRestaurantIndex = (currentRestaurantIndex - 1 + duplicatedRestaurants.length) % duplicatedRestaurants.length; // Circular wrap
            if (currentRestaurantIndex === visibleCards - 1) {
                // If we reach the start of the duplicated array, reset to the end of the original array
                currentRestaurantIndex = duplicatedRestaurants.length - visibleCards - 1;
                restaurantWrapper.style.transition = "none"; // Disable transition for instant reset
                renderRestaurants();
                setTimeout(() => {
                    restaurantWrapper.style.transition = "transform 0.5s ease-in-out"; // Re-enable transition
                }, 0);
            } else {
                renderRestaurants();
            }
        }
    
        prevDiningButton.addEventListener("click", prevRestaurant);
        nextDiningButton.addEventListener("click", nextRestaurant);
    
        // Initial rendering of the first restaurant
        renderRestaurants();
       }
    
    
    
    
    
    
    
    
    
    
    
    
    
      
        // code for rooms page
        const cartContainer = document.getElementById("cart-container");
        const roomsContainer = document.getElementById("rooms-container");
        const totalDates = document.getElementById("total-dates");
        const cartSubTotal = document.getElementById("subtotal");
        const nightsElement = document.getElementById("nights");
        const cartTaxes = document.getElementById("taxes");
        const cartTotal = document.getElementById("cart-total");
        const clearCartButton = document.getElementById("clear-cart-button");
        const checkOutButton = document.getElementById("check-out-button");
        const roomCards = document.getElementById("room-card-container");
    
    
            const rooms = [
        {
            id: 1,
            room: "Tropical Resort Deluxe Suite",
            bed: "One King Bed",
            fit: "2 People",
            size: "400 sq ft",
            package: "All-Inclusive",
            price: 329.99,
            image: "https://images.pexels.com/photos/10973940/pexels-photo-10973940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 2,
            room: "Tropical Resort Deluxe Suite",
            bed: "One King & One Full Bed",
            fit: "4 People",
            size: "500 sq ft",
            package: "All-Inclusive",
            price: 419.99,
            image: "https://images.pexels.com/photos/28464723/pexels-photo-28464723/free-photo-of-luxurious-villa-bedroom-with-scenic-view.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 3,
            room: "Tropical Resort Deluxe Suite",
            bed: "One King, One Queen, & One Full Bed",
            fit: "6 People",
            size: "600 sq ft",
            package: "All-Inclusive",
            price: 539.99,
            image: "https://images.pexels.com/photos/14025024/pexels-photo-14025024.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 4,
            room: "Tropical Resort Premium Suite",
            bed: "One King Bed",
            fit: "2 People",
            size: "450 sq ft",
            package: "All-Inclusive",
            price: 449.99,
            image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGx1eHVyeSUyMGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 5,
            room: "Tropical Resort Premium Suite",
            bed: "One King Bed & One Queen Bed",
            fit: "4 People",
            size: "550 sq ft",
            package: "All-Inclusive",
            price: 549.99,
            image: "https://images.pexels.com/photos/3634741/pexels-photo-3634741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 6,
            room: "Tropical Resort Premium Suite",
            bed: "One King, One Queen, & One Full Bed",
            fit: "6 People",
            size: "650 sq ft",
            package: "All-Inclusive",
            price: 669.99,
            image: "https://images.pexels.com/photos/27626179/pexels-photo-27626179/free-photo-of-a-bedroom-with-a-large-tub-and-a-large-bed.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: 7,
            room: "Tropical Resort Executive Suite",
            bed: "One King Bed",
            fit: "2 People",
            size: "500 sq ft",
            package: "All-Inclusive",
            price: 649.99,
            image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 8,
            room: "Tropical Resort Executive Suite",
            bed: "One King Bed & One Queen Bed",
            fit: "4 People",
            size: "600 sq ft",
            package: "All-Inclusive",
            price: 749.99,
            image: "https://images.pexels.com/photos/14025909/pexels-photo-14025909.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 9,
            room: "Tropical Resort Executive Suite",
            bed: "One King, One Queen, & One Full Bed",
            fit: "6 People",
            size: "700 sq ft",
            package: "All-Inclusive",
            price: 899.99,
            image: "https://images.pexels.com/photos/28347476/pexels-photo-28347476/free-photo-of-a-hotel-room-with-a-bed-television-and-wooden-floors.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
    ];
    
    
                    if (roomCards) {                
    
                rooms.forEach(({id, room, bed, fit, size, package, price, image}) => {
                    roomCards.innerHTML += `
                    <div class="room-card">
                        <h3>${room}</h3>
                        <p><img src="https://img.icons8.com/?size=100&id=561&format=png&color=000000" width="25" height="25" alt="bed icon" class="room-icon">${bed}</p>
                        <p><img src="https://img.icons8.com/?size=100&id=11168&format=png&color=000000" width="25" height="25" alt="people icon" class="room-icon">${fit}</p>
                        <p><img src="https://img.icons8.com/?size=100&id=1420&format=png&color=000000" width="25" height="25" alt="size icon" class="room-icon">${size}</p>
                        <p><img src="https://img.icons8.com/?size=100&id=6399&format=png&color=000000" width="25" height="25" alt="all inclusive icon" class="room-icon">${package}</p>
                        <p><img src="https://img.icons8.com/?size=100&id=2971&format=png&color=000000" width="25" height="25" alt="price icon" class="room-icon">$${price} per night</p>
                        <button id="${id}" class="add-to-cart-button">Book Now</button>
                        <img src="${image}" alt="room image" class="room-image">
                    </div>
                    `;
                })
                    }
    
                    class ShoppingCart {
                        constructor() {
                            this.items = [];
                            this.total = 0;
                            this.taxRate = 8.25;
                        }
                    
                        addRoom(id, rooms) {
                            const product = rooms.find((item) => item.id === id);
                            const { room, bed, price } = product;
                            this.items.push(product);
                    
                            const totalCountPerRoom = {};
                            this.items.forEach((roomCard) => {
                                totalCountPerRoom[roomCard.id] = (totalCountPerRoom[roomCard.id] || 0) + 1;
                            });
                    
    
                            const currentRoomCount = totalCountPerRoom[product.id];
                            const currentRoomCountSpan = document.getElementById(`room-count-for-id${id}`);
                    
                            currentRoomCount > 1
                                ? currentRoomCountSpan.textContent = `${room} (${currentRoomCount}x)`
                                : roomsContainer.innerHTML += `
                                    <div class="room-product" id="room${id}">
                                        <p>
                                            <span class="room-count" id="room-count-for-id${id}">${room}</span>
                                        </p>
                                        <p>${bed}</p>
                                        <p>$${price.toLocaleString()} per night</p>
                                    </div>
                                `;
                        }
                    
                        clearCart() {
                            if (!this.items.length) {
                                alert("Your shopping cart is already empty");
                                return;
                            }
                    
                            const isCartCleared = confirm("Are you sure you want to clear all items from your shopping cart?");
                    
                            if (isCartCleared) {
                                this.items = [];
                                this.total = 0;
                                roomsContainer.innerHTML = "";
                                cartSubTotal.textContent = "$0.00";
                                nightsElement.textContent = "x0";
                                cartTaxes.textContent = "$0.00";
                                cartTotal.textContent = "$0.00";
                            }
                        }
                    
                        calculateTaxes(amount) {
                            return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
                        }
                    
                        calculateTotal() {
                            const checkInDate = localStorage.getItem("checkInDate");
                            const checkOutDate = localStorage.getItem("checkOutDate");
                    
                            if (!checkInDate || !checkOutDate) {
                                alert("Please select check-in and check-out dates.");
                                return;
                            }
                    
                            const numberOfNights = calculateNumberOfNights(checkInDate, checkOutDate);
                    
                            // Calculate subtotal (room price × number of nights)
                            const subTotal = this.items.reduce((total, item) => total + item.price * numberOfNights, 0);
                    
                            // Calculate taxes
                            const tax = this.calculateTaxes(subTotal);
                    
                            // Calculate total
                            this.total = subTotal + tax;

                            // Save cart data to localStorage
                            localStorage.setItem('cartItems', JSON.stringify(this.items));
                            localStorage.setItem('cartSubTotal', subTotal);
                            localStorage.setItem('cartTaxes', tax);
                            localStorage.setItem('cartTotal', this.total);
                            localStorage.setItem('cartNights', numberOfNights);
                    
                            // Update the DOM
                            nightsElement.textContent = `x${numberOfNights}`;
                            cartSubTotal.textContent = `$${subTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                            cartTaxes.textContent = `$${tax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                            cartTotal.textContent = `$${this.total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                    
                            return this.total;
                        }
                    }
    
                    
                    function calculateNumberOfNights(checkInDate, checkOutDate) {
                        const checkIn = new Date(checkInDate);
                        const checkOut = new Date(checkOutDate);
                        const timeDifference = checkOut - checkIn; // Difference in milliseconds
                        const numberOfNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days
                        return numberOfNights;
                    }
    
    
                if (clearCartButton) {
    
    
                const cart = new ShoppingCart();
                const addToCartButtons = document.getElementsByClassName("add-to-cart-button");
                [...addToCartButtons].forEach((btn) => {
                    btn.addEventListener("click", (event) => {
                        cart.addRoom(Number(event.target.id), rooms)
                        
                        cart.calculateTotal();
                    })
                });
    
    
                clearCartButton.addEventListener("click", cart.clearCart.bind(cart));
    
    
                }
    
    
    
      const header = document.getElementById("header");
        const footer = document.getElementById("footer");
        const bufferSpace = 250;
    
    
    
    
        window.addEventListener("scroll", () => {
            const cartHeight = cartContainer.offsetHeight;
            const headerHeight = header.offsetHeight;
            const footerTop = footer.offsetTop;
            const scrollY = window.scrollY;
    
            // Calculate the minimum top value for the cart (to avoid overlapping the header)
            const minTop = headerHeight + bufferSpace;
    
            // Calculate the maximum top value for the cart (to avoid overlapping the footer)
            const maxTop = footerTop - scrollY - cartHeight - bufferSpace;
    
            // Ensure the cart stays within the bounds
            if (scrollY < minTop) {
                // If near the top, keep the cart below the header
                cartContainer.style.top = `${minTop}px`;
            } else if (maxTop > minTop) {
                // If the footer is far away, keep the cart at the top with the buffer
                cartContainer.style.top = `${minTop}px`;
            } else {
                // If the footer is close, adjust the cart's position with the buffer
                cartContainer.style.top = `${maxTop}px`;
            }
        });
    
    
    
    // Clear localStorage after checkout (on the rooms page)
    if (window.location.pathname.includes("rooms.html")) {
        const checkOutButton = document.getElementById("check-out-button");
    
        if (checkOutButton) {
            checkOutButton.addEventListener("click", () => {
    
                if (cartTotal.textContent === "$0" || cartTotal.textContent === "$0.00") {
                    alert("Your cart is empty!")
                } else {
              
                window.location.href = "checkout.html"
                }
            });
        }




         function saveBookingDetails() {
        const destinationRooms = document.getElementById("destination-rooms")?.textContent;
        const totalDates = document.getElementById("total-dates")?.textContent;

        if (destinationRooms) {
            localStorage.setItem("destinationRooms", destinationRooms);
        }
        if (totalDates) {
            localStorage.setItem("totalDates", totalDates);
        }
    }

    // Call this when updating the cart (e.g., when adding a room)
    saveBookingDetails();

    }


    if (window.location.pathname.includes("checkout.html")) {
            const cartContainer = document.getElementById("cart-container");
            const roomsContainer = document.getElementById("rooms-container");
            const cartSubTotal = document.getElementById("subtotal");
            const nightsElement = document.getElementById("nights");
            const cartTaxes = document.getElementById("taxes");
            const cartTotal = document.getElementById("cart-total");
    
            if (cartContainer && cartSubTotal && nightsElement && cartTaxes && cartTotal) {
                // Retrieve cart data from localStorage
                const checkoutRooms = JSON.parse(localStorage.getItem('cartItems')) || [];
                const subTotal = localStorage.getItem('cartSubTotal') || 0;
                const nights = localStorage.getItem('cartNights') || 0;
                const taxes = localStorage.getItem('cartTaxes') || 0;
                const total = localStorage.getItem('cartTotal') || 0;
    
                // Log the retrieved data
                console.log("Retrieved from localStorage:", {
                    subTotal,
                    nights,
                    taxes,
                    total
                });


                  // Clear previous content
        roomsContainer.innerHTML = "";

        // Group rooms by ID to count duplicates
        const roomCounts = {};
        checkoutRooms.forEach(room => {
            roomCounts[room.id] = (roomCounts[room.id] || 0) + 1;
        });

        // Render each unique room with its count
        Object.keys(roomCounts).forEach(id => {
            const count = roomCounts[id];
            const room = checkoutRooms.find(r => r.id === Number(id));
            
            roomsContainer.innerHTML += `
                <div class="room-product" id="room${id}">
                    <p>
                        <span class="room-count">${room.room} (${count}x)</span>
                    </p>
                    <p>${room.bed}</p>
                    <p>$${room.price.toLocaleString()} per night</p>
                </div>
            `;
        });

    
                // Update the DOM with the retrieved data
                cartSubTotal.textContent = `$${parseFloat(subTotal).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                nightsElement.textContent = `x${nights}`;
                cartTaxes.textContent = `$${parseFloat(taxes).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                cartTotal.textContent = `$${parseFloat(total).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            } else {
                console.error("One or more cart elements are missing in the DOM.");
            }



                const checkoutDestinationRooms = document.getElementById("checkout-destination-rooms");
                const checkoutTotalDates = document.getElementById("checkout-total-dates");

                const storedDestination = localStorage.getItem("destinationRooms");
                const storedDates = localStorage.getItem("totalDates");

        if (checkoutDestinationRooms && storedDestination) {
            checkoutDestinationRooms.textContent = storedDestination;
        }
        if (checkoutTotalDates && storedDates) {
            checkoutTotalDates.textContent = storedDates;
        }





            let paymentFirstName = document.getElementById("first-name");
            let paymentLastName = document.getElementById("last-name");
            let paymentEmail = document.getElementById("email");
            let paymentAddress = document.getElementById("address");
            let paymentCountry = document.getElementById("country");
            let paymentState = document.getElementById("state");
            let paymentZip = document.getElementById("zip");
            let cardName = document.getElementById("card-name");
            let cardNumber = document.getElementById("card-number");
            let cardExpiration = document.getElementById("card-expiration");
            let cardCvv = document.getElementById("card-cvv");
            let paymentButton = document.getElementById("payment-button");
            let promoInput = document.getElementById("promo-input");
            let promoButton = document.getElementById("promo-button");
            let promoDiscount = document.getElementById("promo-discount");
            let discountSection = document.getElementById("discount-section");

            
            if (paymentButton) {

                    paymentButton.addEventListener("click", (e) => {
                            e.preventDefault();
                    
                    if (!paymentFirstName.value || !paymentLastName.value) {
                        alert("Please enter your first and last name!");

                } else if (!paymentEmail.value) {
                        alert("Please enter your email!");

                } else if (!paymentAddress.value || !paymentCountry.value || !paymentState.value || !paymentZip.value) {
                        alert("Please enter your full address!")

                }  else if (!cardName.value || !cardNumber.value || !cardExpiration.value || !cardCvv.value) {
                        alert("Please enter all card details!")
                } else {
                        window.location.href = "confirmation.html";
                        paymentFirstName.value = "";
                        paymentLastName.value = "";
                        paymentEmail.value = "";
                        paymentAddress.value = "";
                        paymentAddress2.value = "";
                        paymentCountry.value = "";
                        paymentState.value = "";
                        paymentZip.value = "";
                        cardName.value = "";
                        cardNumber.value = "";
                        cardExpiration.value = "";
                        cardCvv.value = "";
                        promoInput.value = "";
                        discountSection.style.display = "none";
                }
                    
                    
                    })
        
            }


            if (promoInput && promoButton) {
                
                promoButton.addEventListener("click", applyPromoCode);

                const promoDataBase = {
                    "IMTHEBESTCANDIDATE": 0.25, //25% off
                };

                

                function applyPromoCode() {
                        
                        const originalPrice = Number(cartTotal.textContent.replace(/[$,]/g, "").trim());
                        
                        const promoCode = promoInput.value.trim().replace(/ {1,}/g, "").toUpperCase();


              
              
                        if (promoDataBase.hasOwnProperty(promoCode)) {
                            const discount = promoDataBase[promoCode];

                            if (typeof discount === "number") {
                                    const discountedAmount = originalPrice * discount;
                                    const discountedPrice = originalPrice - discountedAmount;
                                    promoDiscount.textContent = `-$${discountedAmount.toFixed(2)}`;
                                    promoDiscount.style.color = "red";
                                    discountSection.style.display = "block";
                                    cartTotal.textContent = `$${discountedPrice.toFixed(2)}`;
                            };
                        };
                };
            };












                 const header = document.getElementById("header");
                 const footer = document.getElementById("checkout-footer");
                 const bufferSpace = 50;
    
    
    
    
        window.addEventListener("scroll", () => {
            const cartHeight = cartContainer.offsetHeight;
            const headerHeight = header.offsetHeight;
            const footerTop = footer.offsetTop;
            const scrollY = window.scrollY;
    
            // Calculate the minimum top value for the cart (to avoid overlapping the header)
            const minTop = headerHeight + bufferSpace;
    
            // Calculate the maximum top value for the cart (to avoid overlapping the footer)
            const maxTop = footerTop - scrollY - cartHeight - bufferSpace;
    
            // Ensure the cart stays within the bounds
            if (scrollY < minTop) {
                // If near the top, keep the cart below the header
                cartContainer.style.top = `${minTop}px`;
            } else if (maxTop > minTop) {
                // If the footer is far away, keep the cart at the top with the buffer
                cartContainer.style.top = `${minTop}px`;
            } else {
                // If the footer is close, adjust the cart's position with the buffer
                cartContainer.style.top = `${maxTop}px`;
            }
        });
    }


        if (window.location.pathname.includes("confirmation.html")) {

                function generateConfirmation(length = 8) {
                    let result = "";

                    for (let i = 0; i < length; i++) {
                            result += Math.floor(Math.random() * 10);
                    }
                    return result;
                }

            const displayDiv = document.getElementById('confirmationDisplay');
            const confirmationNumber = generateConfirmation();


             displayDiv.innerHTML = `
            <div class="confirmation-number">
                <strong>Your confirmation number:</strong>
                <span id="confirmationNumber" class="confirmation-number">#${confirmationNumber}</span>
            </div>`;
        }


            let contactName = document.getElementById("contact-name");
            let contactEmail = document.getElementById("contact-email");
            let contactMessage = document.getElementById("contact-message");
            let contactButton = document.getElementById("contact-button");

        if (window.location.pathname.includes("contact.html")) {

            contactButton.addEventListener("click", (e) => {
                    e.preventDefault();
                   
                   if (!contactName.value) {
                        alert("Please enter your name.");
                   } else if (!contactEmail.value) {
                        alert("Please enter your email.");
                   } else if (!contactMessage.value) {
                        alert("Please enter a message.");
                   } else {
                    alert("Thank you for wanting to chat! You will hear from our representatives in 24-48 hours.");
                    contactName.value = "";
                    contactEmail.value = "";
                    contactMessage.value = "";
                   }
            })


        }

      
    
       });