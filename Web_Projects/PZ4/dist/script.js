"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// DOM Elements
const loadUsersBtn = document.getElementById('loadUsersBtn');
const userGrid = document.getElementById('userGrid');
const modalOverlay = document.getElementById('userModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const scrollTopBtn = document.getElementById('scrollTopBtn');
// Modal Elements
const modalName = document.getElementById('modalName');
const modalUsername = document.getElementById('modalUsername');
const modalAvatar = document.getElementById('modalAvatar');
const modalEmail = document.getElementById('modalEmail');
const modalPhone = document.getElementById('modalPhone');
const modalWebsite = document.getElementById('modalWebsite');
const modalAddress = document.getElementById('modalAddress');
const modalCompany = document.getElementById('modalCompany');
const modalCatchPhrase = document.getElementById('modalCatchPhrase');
// State
let users = [];
// Functions
/**
 * Fetches users from the JSONPlaceholder API
 */
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            loadUsersBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Завантаження...';
            loadUsersBtn.disabled = true;
            const response = yield fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok)
                throw new Error('Failed to fetch data');
            users = yield response.json();
            // Simulate delay for "Loading" feel (premium UX)
            setTimeout(() => {
                renderUsers(users);
                loadUsersBtn.innerHTML = '<i class="fa-solid fa-check"></i> Оновлено';
                setTimeout(() => {
                    loadUsersBtn.disabled = false;
                    loadUsersBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> Завантажити дані';
                }, 2000);
            }, 800);
        }
        catch (error) {
            console.error('Error:', error);
            loadUsersBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Помилка';
            loadUsersBtn.disabled = false;
        }
    });
}
/**
 * Renders user cards to the grid
 * @param userList Array of User objects
 */
function renderUsers(userList) {
    userGrid.innerHTML = ''; // Clear empty state
    if (userList.length === 0) {
        userGrid.innerHTML = '<p class="empty-state">No users found.</p>';
        return;
    }
    userList.forEach((user, index) => {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.style.animationDelay = `${index * 0.1}s`; // Staggered animation
        // Generate initials for avatar
        const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2);
        card.innerHTML = `
            <div class="card-avatar">${initials}</div>
            <h3>${user.name}</h3>
            <p>@${user.username}</p>
            <p><i class="fa-solid fa-building"></i> ${user.company.name}</p>
        `;
        card.addEventListener('click', () => openModal(user));
        userGrid.appendChild(card);
    });
}
/**
 * Opens the user details modal
 * @param user User object
 */
function openModal(user) {
    modalName.textContent = user.name;
    modalUsername.textContent = `@${user.username}`;
    modalEmail.textContent = user.email;
    modalPhone.textContent = user.phone;
    modalWebsite.textContent = user.website;
    modalWebsite.href = `http://${user.website}`;
    modalAddress.textContent = `${user.address.street}, ${user.address.city}`;
    modalCompany.textContent = user.company.name;
    modalCatchPhrase.textContent = `"${user.company.catchPhrase}"`;
    const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2);
    modalAvatar.textContent = initials;
    modalOverlay.classList.remove('hidden');
    // Force reflow
    void modalOverlay.offsetWidth;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}
/**
 * Closes the modal
 */
function closeModal() {
    modalOverlay.classList.remove('active');
    setTimeout(() => {
        modalOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}
// Event Listeners
// 1. Fetch Data
loadUsersBtn.addEventListener('click', fetchUsers);
// 2. Modal Close
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay)
        closeModal();
});
// 3. Scroll Event (Show/Hide ScrollTop Button)
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('hidden');
    }
    else {
        scrollTopBtn.classList.add('hidden');
    }
});
// 4. Scroll to Top Action
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
console.log('Premium Dashboard Loaded');
