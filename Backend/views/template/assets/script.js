//This is icon initilization script

lucide.createIcons();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
	mobileMenu.classList.toggle("hidden");
});

// Add some interactive effects
document.addEventListener("DOMContentLoaded", () => {
	// Smooth scrolling for anchor links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute("href"));
			if (target) {
				target.scrollIntoView({
					behavior: "smooth",
				});

				function getReviewData() {
					return {
						rating: selectedRating,
					};
				}

				// Example: How to get the data when form is submitted
				document
					.querySelector("#reviewForm form")
					.addEventListener("submit", (e) => {
						e.preventDefault();
						const reviewData = getReviewData();
						console.log("Review Data:", reviewData);
						// You can now send this data to your backend
					});
			}
		});
	});

	// Add cart animation on hover
	const cartIcon = document.querySelector(
		'[data-lucide="shopping-cart"]',
	).parentElement;
	cartIcon.addEventListener("mouseenter", () => {
		cartIcon.classList.add("scale-110");
		cartIcon.classList.add("transition-transform");
	});
	cartIcon.addEventListener("mouseleave", () => {
		cartIcon.classList.remove("scale-110");
	});
});

var addReview = document.getElementById("addReview");
var reviewForm = document.getElementById("reviewForm");
var cancelReview = document.getElementById("cancelReview");
var _reviewCount = document.getElementById("reviewCount");
var selectedRating = 0;

addReview.addEventListener("click", () => {
	reviewForm.classList.toggle("hidden");
	addReview.textContent = reviewForm.classList.contains("hidden")
		? "Write a Review"
		: "Hide Review Form";
});

cancelReview.addEventListener("click", () => {
	reviewForm.classList.add("hidden");
	addReview.textContent = "Write a Review";
	document.getElementById("reviewText").value = "";
	document.getElementById("reviewerName").value = "";
	selectedRating = 0;
	document.getElementById("ratingInput").value = 0;
	document.querySelectorAll(".star").forEach((star) => {
		star.classList.remove("text-yellow-400");
		star.classList.add("text-gray-300");
	});
});

document.querySelectorAll(".star").forEach((star) => {
	star.addEventListener("click", (e) => {
		selectedRating = parseInt(e.target.getAttribute("data-rating"), 10);
		document.getElementById("ratingInput").value = selectedRating;
		document.querySelectorAll(".star").forEach((s, index) => {
			if (index < selectedRating) {
				s.classList.remove("text-gray-300");
				s.classList.add("text-yellow-400");
			} else {
				s.classList.remove("text-yellow-400");
				s.classList.add("text-gray-300");
			}
		});
	});
});

//login Script
// Toggle password visibility
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const eyeIcon = document.getElementById("eyeIcon");
const eyeOffIcon = document.getElementById("eyeOffIcon");

togglePassword.addEventListener("click", () => {
	const type =
		passwordInput.getAttribute("type") === "password" ? "text" : "password";
	passwordInput.setAttribute("type", type);

	eyeIcon.classList.toggle("hidden");
	eyeOffIcon.classList.toggle("hidden");
});

// Handle form submission
document.getElementById("loginForm").addEventListener("submit", (e) => {
	e.preventDefault();

	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const rememberMe = document.getElementById("remember-me").checked;

	console.log("Login attempt:", {
		email: email,
		password: password,
		rememberMe: rememberMe,
	});

	// Add your login logic here
	alert("Login form submitted! Check console for details.");
});
