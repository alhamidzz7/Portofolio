// Initialize Lucide Icons
lucide.createIcons();

// Dynamic Year
document.getElementById('year').textContent = new Date().getFullYear();

// Dynamic Typing Effect
const roles = ["Frontend Developer", "UI/UX Designer", "Web Enthusiast", "Full Stack Learner"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingEffect');

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

document.addEventListener('DOMContentLoaded', typeEffect);

// Theme Toggle (Dark / Light Mode)
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function setTheme(isDark) {
    if (isDark) {
        document.documentElement.classList.add('dark');
        themeIcon.setAttribute('data-lucide', 'sun');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.setAttribute('data-lucide', 'moon');
        localStorage.setItem('theme', 'light');
    }
    lucide.createIcons();
}

// Check saved theme or preference
const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    setTheme(true);
} else {
    setTheme(false);
}

themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(!isDark);
});

// Mobile Navigation Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class
        filterBtns.forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
        filterBtns.forEach(b => b.classList.add('bg-slate-200', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300'));
        
        // Add active class to clicked
        btn.classList.add('active', 'bg-primary', 'text-white');
        btn.classList.remove('bg-slate-200', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Copy Email Feature
const copyEmailBtn = document.getElementById('copyEmailBtn');
const contactEmail = document.getElementById('contactEmail');

copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(contactEmail.textContent);
    const originalText = copyEmailBtn.textContent;
    copyEmailBtn.textContent = 'Copied!';
    copyEmailBtn.classList.add('text-emerald-500');
    setTimeout(() => {
        copyEmailBtn.textContent = originalText;
        copyEmailBtn.classList.remove('text-emerald-500');
    }, 2000);
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.classList.remove('hidden');
    contactForm.reset();
    setTimeout(() => {
        formStatus.classList.add('hidden');
    }, 4000);
});

// Edit Profile Modal Functionality
const editModal = document.getElementById('editModal');
const openEditBtn = document.getElementById('openEditModal');
const closeEditBtn = document.getElementById('closeEditModal');
const cancelEditBtn = document.getElementById('cancelEdit');
const editProfileForm = document.getElementById('editProfileForm');

// Fill Modal Inputs
openEditBtn.addEventListener('click', () => {
    document.getElementById('editName').value = document.getElementById('heroName').textContent;
    document.getElementById('editEmail').value = document.getElementById('contactEmail').textContent;
    document.getElementById('editBio').value = document.getElementById('heroBio').textContent;
    document.getElementById('editPhoto').value = document.getElementById('profileImg').src;
    editModal.classList.remove('hidden');
});

const closeModal = () => editModal.classList.add('hidden');
closeEditBtn.addEventListener('click', closeModal);
cancelEditBtn.addEventListener('click', closeModal);

// Save Edit Profile
editProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newName = document.getElementById('editName').value;
    const newEmail = document.getElementById('editEmail').value;
    const newBio = document.getElementById('editBio').value;
    const newPhoto = document.getElementById('editPhoto').value;

    if(newName) {
        document.getElementById('heroName').textContent = newName;
        document.getElementById('navBrand').textContent = newName.split(' ')[0] + 'Dev';
        document.getElementById('footerName').textContent = newName;
    }
    if(newEmail) document.getElementById('contactEmail').textContent = newEmail;
    if(newBio) document.getElementById('heroBio').textContent = newBio;
    if(newPhoto) document.getElementById('profileImg').src = newPhoto;

    closeModal();
});