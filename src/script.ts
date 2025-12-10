// Interfaces for Type Safety
interface Geo {
    lat: string;
    lng: string;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

// DOM Elements
const loadUsersBtn = document.getElementById('loadUsersBtn') as HTMLButtonElement;
const userGrid = document.getElementById('userGrid') as HTMLElement;
const modalOverlay = document.getElementById('userModal') as HTMLElement;
const closeModalBtn = document.getElementById('closeModalBtn') as HTMLButtonElement;
const scrollTopBtn = document.getElementById('scrollTopBtn') as HTMLButtonElement;

// Modal Elements
const modalName = document.getElementById('modalName') as HTMLElement;
const modalUsername = document.getElementById('modalUsername') as HTMLElement;
const modalAvatar = document.getElementById('modalAvatar') as HTMLElement;
const modalEmail = document.getElementById('modalEmail') as HTMLElement;
const modalPhone = document.getElementById('modalPhone') as HTMLElement;
const modalWebsite = document.getElementById('modalWebsite') as HTMLAnchorElement;
const modalAddress = document.getElementById('modalAddress') as HTMLElement;
const modalCompany = document.getElementById('modalCompany') as HTMLElement;
const modalCatchPhrase = document.getElementById('modalCatchPhrase') as HTMLElement;

// State
let users: User[] = [];

// Functions

/**
 * Fetches users from the JSONPlaceholder API
 */
async function fetchUsers(): Promise<void> {
    try {
        loadUsersBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Завантаження...';
        loadUsersBtn.disabled = true;

        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch data');

        users = await response.json();

        // Simulate delay for "Loading" feel (premium UX)
        setTimeout(() => {
            renderUsers(users);
            loadUsersBtn.innerHTML = '<i class="fa-solid fa-check"></i> Оновлено';
            setTimeout(() => {
                loadUsersBtn.disabled = false;
                loadUsersBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> Завантажити дані';
            }, 2000);
        }, 800);

    } catch (error) {
        console.error('Error:', error);
        loadUsersBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Помилка';
        loadUsersBtn.disabled = false;
    }
}

/**
 * Renders user cards to the grid
 * @param userList Array of User objects
 */
function renderUsers(userList: User[]): void {
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
function openModal(user: User): void {
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
function closeModal(): void {
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
    if (e.target === modalOverlay) closeModal();
});

// 3. Scroll Event (Show/Hide ScrollTop Button)
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('hidden');
    } else {
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
