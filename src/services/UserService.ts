import { User } from "../types/UserTypes.js";

export async function fetchUsersData(): Promise<User[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
        throw new Error('Помилка завантаження');
    }
    return await response.json();
}
