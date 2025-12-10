import { User } from "../types/UserTypes.js";

// Elements
const modalOverlay = document.getElementById('userModal') as HTMLElement;
const modalName = document.getElementById('modalName') as HTMLElement;
const modalUsername = document.getElementById('modalUsername') as HTMLElement;
const modalAvatar = document.getElementById('modalAvatar') as HTMLElement;
const modalEmail = document.getElementById('modalEmail') as HTMLElement;
const modalPhone = document.getElementById('modalPhone') as HTMLElement;
const modalWebsite = document.getElementById('modalWebsite') as HTMLAnchorElement;
const modalAddress = document.getElementById('modalAddress') as HTMLElement;
const modalCompany = document.getElementById('modalCompany') as HTMLElement;
const modalCatchPhrase = document.getElementById('modalCatchPhrase') as HTMLElement;

export function openModal(user: User): void {
    if (!modalOverlay) return;

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
    void modalOverlay.offsetWidth; // Force reflow
    modalOverlay.classList.add('active');

    document.body.style.overflow = 'hidden';
}

export function closeModal(): void {
    if (!modalOverlay) return;

    modalOverlay.classList.remove('active');
    setTimeout(() => {
        modalOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

export function initModalListeners(): void {
    const closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }
}
