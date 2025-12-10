import { openModal } from "./Modal";
const userGrid = document.getElementById('userGrid');
export function renderUsers(userList) {
    if (!userGrid)
        return;
    userGrid.innerHTML = '';
    if (userList.length === 0) {
        userGrid.innerHTML = '<p class="empty-state">Користувачів не знайдено.</p>';
        return;
    }
    userList.forEach((user, index) => {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.style.animationDelay = `${index * 0.1}s`;
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
