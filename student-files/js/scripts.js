const gallery = document.getElementById('gallery');
let employeeData = [];

// Fetch Request
fetch('https://randomuser.me/api/?results=12')
  .then(response => response.json()) 
  .then(data => {
    employeeData = data.results; // Save the 12 employees into box
    displayEmployees(employeeData); // Build the Lego wall
  })
  .catch(error => console.log('Error fetching data:', error));

// Functions
function displayEmployees(employeeData) {
    let employeeHTML = '';

  employeeData.forEach((employee, index) => {
    employeeHTML += `
      <div class="card" data-index="${index}">
        <div class="card-img-container">
          <img class="card-img" src="${employee.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="card-text">${employee.email}</p>
          <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
        </div>
      </div>
    `;
  });

  gallery.insertAdjacentHTML('beforeend', employeeHTML);
}

function displayModal(employee) {
    const date = new Date(employee.dob.date);
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  const modalHTML = `
    <div class="modal-container">
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
          <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="modal-text">${employee.email}</p>
          <p class="modal-text cap">${employee.location.city}</p>
          <hr>
          <p class="modal-text">${employee.cell}</p>
          <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
          <p class="modal-text">Birthday: ${formattedDate}</p>
        </div>
      </div>
    </div>
  `;

  // Add the modal to the body
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Add the close button
  const closeBtn = document.getElementById('modal-close-btn');
  const modalContainer = document.querySelector('.modal-container');
  
  closeBtn.addEventListener('click', () => {
    modalContainer.remove(); // Removes the modal when the X is clicked
  });
}

// Event Listeners
gallery.addEventListener('click', (e) => {
   const clickedCard = e.target.closest('.card'); // .closest() checks if the exact one clicked belongs to a '.card'
   if (clickedCard) { // If a card was clicked (and not just the empty background space), open the modal
    const index = clickedCard.getAttribute('data-index'); // Grab the data-index number
    displayModal(employeeData[index]); // Finds specific employee in global box and passes them to displayModal function
  }
});