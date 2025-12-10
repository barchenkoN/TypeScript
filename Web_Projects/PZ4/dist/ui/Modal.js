// Elements
const modalOverlay = document.getElementById('userModal');
const modalName = document.getElementById('modalName');
const modalUsername = document.getElementById('modalUsername');
const modalAvatar = document.getElementById('modalAvatar');
const modalEmail = document.getElementById('modalEmail');
const modalPhone = document.getElementById('modalPhone');
const modalWebsite = document.getElementById('modalWebsite');
const modalAddress = document.getElementById('modalAddress');
const modalCompany = document.getElementById('modalCompany');
const modalCatchPhrase = document.getElementById('modalCatchPhrase');
export function openModal(user) {
    if (!modalOverlay)
        return;
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
export function closeModal() {
    if (!modalOverlay)
        return;
    modalOverlay.classList.remove('active');
    setTimeout(() => {
        modalOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}
export function initModalListeners() {
    const closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay)
                closeModal();
        });
    }
}
