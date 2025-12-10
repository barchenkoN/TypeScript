/**
 * Практична робота №5
 * Тема: Generic типи в TypeScript
 */

// Крок 1: Створення типів товарів

type BaseProduct = {
    id: number;
    name: string;
    price: number;
};

type Electronics = BaseProduct & {
    category: 'electronics';
    warrantyPeriod: number; // місяців
    brand: string;
};

type Clothing = BaseProduct & {
    category: 'clothing';
    size: 'SX' | 'S' | 'M' | 'L' | 'XL';
    material: string;
};

type Book = BaseProduct & {
    category: 'books';
    author: string;
    pages: number;
};

// Крок 2: Створення функцій для пошуку та фільтрації

// Пошук товару за ID
const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
    return products.find(product => product.id === id);
};

// Фільтрація товарів за максимальною ціною
const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
    return products.filter(product => product.price <= maxPrice);
};

// Крок 3: Створення кошика

type CartItem<T> = {
    product: T;
    quantity: number;
};

// Додавання товару в кошик
const addToCart = <T extends BaseProduct>(
    cart: CartItem<T>[],
    product: T,
    quantity: number
): CartItem<T>[] => {
    // Перевіряємо, чи є вже такий товар у кошику
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

    if (existingItemIndex !== -1) {
        // Якщо є, створюємо новий масив з оновленою кількістю
        const updatedCart = [...cart];
        updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + quantity
        };
        return updatedCart;
    }

    // Якщо немає, додаємо новий елемент
    return [...cart, { product, quantity }];
};

// Підрахунок загальної вартості
const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

// Крок 4: Використання функцій та перевірка

console.log("=== ТЕСТУВАННЯ РОБОТИ МАГАЗИНУ ===");

// 1. Створення тестових даних
const electronicsList: Electronics[] = [
    { id: 1, name: "iPhone 15", price: 35000, category: 'electronics', warrantyPeriod: 12, brand: "Apple" },
    { id: 2, name: "Samsung Galaxy S23", price: 30000, category: 'electronics', warrantyPeriod: 24, brand: "Samsung" },
    { id: 3, name: "Sony Headphones", price: 5000, category: 'electronics', warrantyPeriod: 12, brand: "Sony" }
];

const clothingList: Clothing[] = [
    { id: 4, name: "T-Shirt Basic", price: 500, category: 'clothing', size: 'M', material: "Cotton" },
    { id: 5, name: "Jeans Classic", price: 2000, category: 'clothing', size: 'L', material: "Denim" }
];

// 2. Тестування пошуку
console.log("\n--- Пошук товарів ---");
const phone = findProduct(electronicsList, 1);
const tShirt = findProduct(clothingList, 4);
const notFound = findProduct(electronicsList, 999);

console.log("Знайдено телефон:", phone?.name); // iPhone 15
console.log("Знайдено футболку:", tShirt?.name); // T-Shirt Basic
console.log("Неіснуючий товар:", notFound); // undefined

// 3. Тестування фільтрації
console.log("\n--- Фільтрація за ціною (до 25000) ---");
const cheapElectronics = filterByPrice(electronicsList, 25000);
console.log("Доступна електроніка:", cheapElectronics.map(e => `${e.name} (${e.price} грн)`));

// 4. Тестування кошика з різними типами товарів
console.log("\n--- Робота з кошиком ---");

// Кошик для електроніки
let electronicsCart: CartItem<Electronics>[] = [];

if (phone) {
    electronicsCart = addToCart(electronicsCart, phone, 1);
    console.log(`Додано: ${phone.name}, Кількість: 1`);
}

const headphones = electronicsList[2];
electronicsCart = addToCart(electronicsCart, headphones, 2);
console.log(`Додано: ${headphones.name}, Кількість: 2`);

console.log("Склад кошика електроніки:", electronicsCart);
console.log("Загальна вартість електроніки:", calculateTotal(electronicsCart), "грн"); // 35000 + 5000*2 = 45000

// Кошик змішаних товарів (використовуємо BaseProduct або Union тип)
type AnyProduct = Electronics | Clothing | Book;
let mixedCart: CartItem<AnyProduct>[] = [];

if (tShirt) {
    mixedCart = addToCart(mixedCart, tShirt as AnyProduct, 3);
}
if (phone) {
    mixedCart = addToCart(mixedCart, phone as AnyProduct, 1);
}

console.log("\n--- Змішаний кошик ---");
mixedCart.forEach(item => {
    console.log(`Товар: ${item.product.name}, Ціна: ${item.product.price}, К-сть: ${item.quantity}`);
});
console.log("Всього до сплати:", calculateTotal(mixedCart), "грн");
