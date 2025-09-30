// Демонстрація базових типів TypeScript

// String тип
const greeting: string = "Welcome!";
const projectName: string = "TypeScript";

// Number тип
const version: number = 1.0;
const maxUsers: number = 100;
const pi: number = 3.14159;

// Boolean тип
const isActive: boolean = true;
const hasErrors: boolean = false;

// Функція з типізацією параметрів та повертаємого значення
function displayInfo(name: string, ver: number, active: boolean): string {
  return `Project: ${name}, Version: ${ver}, Active: ${active}`;
}

// Виклик функції
const info: string = displayInfo(projectName, version, isActive);

// Виведення результатів
console.log(greeting);
console.log(info);
console.log(`Максимальна кількість користувачів: ${maxUsers}`);
console.log(`Значення Pi: ${pi}`);
console.log(`Наявність помилок: ${hasErrors}`);
