var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchUsersData } from "./services/UserService";
import { renderUsers } from "./ui/UserGrid";
import { initModalListeners } from "./ui/Modal";
import { initScrollButton } from "./ui/ScrollButton";
const loadUsersBtn = document.getElementById('loadUsersBtn');
function handleLoadUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (loadUsersBtn) {
                loadUsersBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Завантаження...';
                loadUsersBtn.disabled = true;
            }
            const users = yield fetchUsersData();
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
        }
        catch (error) {
            console.error('Error:', error);
            if (loadUsersBtn) {
                loadUsersBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Помилка';
                loadUsersBtn.disabled = false;
            }
        }
    });
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
