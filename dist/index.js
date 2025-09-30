"use strict";
// Демонстрація базових типів TypeScript
// String тип
const greeting = "Welcome!";
const projectName = "TypeScript";
// Number тип
const version = 1.0;
const maxUsers = 100;
const pi = 3.14159;
// Boolean тип
const isActive = true;
const hasErrors = false;
// Функція з типізацією параметрів та повертаємого значення
function displayInfo(name, ver, active) {
    return `Project: ${name}, Version: ${ver}, Active: ${active}`;
}
// Виклик функції
const info = displayInfo(projectName, version, isActive);
// Виведення результатів
console.log(greeting);
console.log(info);
console.log(`Максимальна кількість користувачів: ${maxUsers}`);
console.log(`Значення Pi: ${pi}`);
console.log(`Наявність помилок: ${hasErrors}`);
