// JavaScript for the Helping Hands website

// Mobile menu
var menuButton = document.getElementById("menuButton");
var navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", function () {
    navLinks.classList.toggle("show");

    if (navLinks.classList.contains("show")) {
      menuButton.setAttribute("aria-expanded", "true");
    } else {
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

// Filter the cause cards
var filterButtons = document.querySelectorAll(".filter-button");
var causeCards = document.querySelectorAll(".cause-card");
var noCauses = document.getElementById("noCauses");

if (filterButtons.length > 0 && causeCards.length > 0) {
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var selected = button.getAttribute("data-filter");
      var visibleCount = 0;

      filterButtons.forEach(function (item) {
        item.classList.remove("active");
      });
      button.classList.add("active");

      causeCards.forEach(function (card) {
        var category = card.getAttribute("data-category");

        if (selected === "all" || selected === category) {
          card.style.display = "block";
          visibleCount = visibleCount + 1;
        } else {
          card.style.display = "none";
        }
      });

      if (noCauses) {
        noCauses.hidden = visibleCount > 0;
      }
    });
  });
}

// Save a sample donation in the browser. This does not collect money.
var donationForm = document.getElementById("donationForm");

if (donationForm) {
  donationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("donorName").value.trim();
    var email = document.getElementById("donorEmail").value.trim();
    var amountChoice = document.getElementById("donationAmount").value;
    var customAmount = document.getElementById("customAmount").value;
    var amount = amountChoice;
    var message = document.getElementById("donationMessage");

    if (amountChoice === "other") {
      amount = Number(customAmount);
    } else {
      amount = Number(amountChoice);
    }

    if (name === "" || email === "" || amount <= 0 || !Number.isFinite(amount)) {
      message.textContent = "Please enter your details and a valid amount.";
      return;
    }

    var donations = JSON.parse(localStorage.getItem("helpingHandsDonations") || "[]");
    donations.push({ name: name, email: email, amount: amount, date: new Date().toLocaleDateString() });
    localStorage.setItem("helpingHandsDonations", JSON.stringify(donations));

    message.textContent = "Thank you, " + name + ". Your sample donation entry has been saved in this browser.";
    donationForm.reset();
  });
}

// Save a volunteer form entry
var volunteerForm = document.getElementById("volunteerForm");

if (volunteerForm) {
  volunteerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("volName").value.trim();
    var email = document.getElementById("volEmail").value.trim();
    var phone = document.getElementById("volPhone").value.trim();
    var interest = document.getElementById("volInterest").value;
    var message = document.getElementById("volunteerMessage");

    if (name === "" || email === "" || phone === "" || interest === "") {
      message.textContent = "Please fill in all the required fields.";
      return;
    }

    var volunteers = JSON.parse(localStorage.getItem("helpingHandsVolunteers") || "[]");
    volunteers.push({ name: name, email: email, phone: phone, interest: interest });
    localStorage.setItem("helpingHandsVolunteers", JSON.stringify(volunteers));

    message.textContent = "Thanks, " + name + ". Your sample volunteer form has been saved.";
    volunteerForm.reset();
  });
}

// Save a contact message in the browser
var contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("contactName").value.trim();
    var email = document.getElementById("contactEmail").value.trim();
    var subject = document.getElementById("contactSubject").value.trim();
    var text = document.getElementById("contactText").value.trim();
    var message = document.getElementById("contactMessage");

    if (name === "" || email === "" || subject === "" || text === "") {
      message.textContent = "Please complete all the fields.";
      return;
    }

    var messages = JSON.parse(localStorage.getItem("helpingHandsMessages") || "[]");
    messages.push({ name: name, email: email, subject: subject, message: text });
    localStorage.setItem("helpingHandsMessages", JSON.stringify(messages));

    message.textContent = "Thanks for your message. It has been saved in this browser for this demo.";
    contactForm.reset();
  });
}
