// ======= DARK MODE TOGGLE =======
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const toggleText = document.querySelector('.toggle-text');

function setTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        toggleText.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        toggleText.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}

// Restore saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');
    const isDark = theme === 'dark';
    toggleSwitch.checked = isDark;
    setTheme(isDark);
    
    // Also initialize doctor cards and form listener
    generateDoctorCards();
    setupContactFormValidation();
});

// Toggle theme on checkbox change
toggleSwitch.addEventListener('change', function () {
    setTheme(this.checked);
});

// ======= NAVIGATION SLIDE =======
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            link.style.animation = link.style.animation ? '' :
                `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        });
        burger.classList.toggle('toggle');
    });
};
navSlide();

// ======= DOCTOR CARD GENERATOR =======
const doctorsContainer = document.querySelector('.doctors-container');

const indianDoctors = [
    { name: "Dr. Arjun Sharma", specialty: "Cardiologist", experience: 15, ratings: 4.9, patients: 1500 },
    { name: "Dr. Priya Patel", specialty: "Dermatologist", experience: 8, ratings: 4.7, patients: 1200 },
    { name: "Dr. Vikram Singh", specialty: "Neurologist", experience: 12, ratings: 4.8, patients: 950 },
    { name: "Dr. Neha Verma", specialty: "Pediatrician", experience: 10, ratings: 4.9, patients: 2000 }
];

function generateDoctorCards() {
  if (!doctorsContainer) return;

  // Array of 8 image paths (using d1.jpg, d2.jpg, d3.jpg, ...)
  const doctorImages = [
      'd1.jpg', 'd2.jpg', 'd3.jpg', 'd4.jpg',
      'd5.jpg', 'd6.jpg', 'd7.jpg', 'd8.jpg'
  ];

  // Shuffle the images so they're random but unique
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }

  // Shuffle the images to randomize which images go to the doctor cards
  const shuffledImages = shuffleArray([...doctorImages]);

  indianDoctors.forEach((doctor, index) => {
      const imagePath = `doctor-images/${shuffledImages[index % shuffledImages.length]}`; // Ensure no repeats in a cycle

      const doctorCard = document.createElement('div');
      doctorCard.classList.add('doctor-card');

      doctorCard.innerHTML = `
          <div class="doctor-img" style="display: flex; align-items: center; justify-content: center;">
              <img src="${imagePath}" alt="${doctor.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 0.5rem;">
          </div>
          <div class="doctor-info">
              <h3>${doctor.name}</h3>
              <h4>${doctor.specialty}</h4>
              <p>${doctor.experience} years of experience</p>
              <div class="doctor-stats">
                  <div class="stat">
                      <span>${doctor.ratings}/5</span>
                      Rating
                  </div>
                  <div class="stat">
                      <span>${doctor.patients}+</span>
                      Patients
                  </div>
              </div>
              <div class="doctor-actions">
                  <button class="btn primary-btn">Book Now</button>
                  <button class="btn secondary-btn">View Profile</button>
              </div>
          </div>
      `;

      doctorsContainer.appendChild(doctorCard);
  });
}




// ======= CONTACT FORM VALIDATION =======
function setupContactFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !phone || !message) {
            alert('Please fill in all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid Indian phone number');
            return;
        }

        alert('Form submitted successfully!');
        contactForm.reset();
    });
}
