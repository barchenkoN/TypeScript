export async function fetchUsersData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
        throw new Error('Помилка завантаження');
    }
    return await response.json();
}
