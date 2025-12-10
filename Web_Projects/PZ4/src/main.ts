import { fetchUsersData } from "./services/UserService";
import { renderUsers } from "./ui/UserGrid";
import { initModalListeners } from "./ui/Modal";
import { initScrollButton } from "./ui/ScrollButton";

const loadUsersBtn = document.getElementById('loadUsersBtn') as HTMLButtonElement;

async function handleLoadUsers(): Promise<void> {
    try {
        if (loadUsersBtn) {
            loadUsersBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Завантаження...';
            loadUsersBtn.disabled = true;
        }

        const users = await fetchUsersData();

        setTimeout(() => {
            renderUsers(users);
            if (loadUsersBtn) {
                loadUsersBtn.innerHTML = '<i class="fa-solid fa-check"></i> Оновлено';
                setTimeout(() => {
                    loadUsersBtn.disabled = false;
                    loadUsersBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> Завантажити дані';
                }, 2000);
            }
        }, 800);

    } catch (error) {
        console.error('Error:', error);
        if (loadUsersBtn) {
            loadUsersBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Помилка';
            loadUsersBtn.disabled = false;
        }
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    if (loadUsersBtn) {
        loadUsersBtn.addEventListener('click', handleLoadUsers);
    }

    initModalListeners();
    initScrollButton();
    console.log('Modules loaded successfully');
});
