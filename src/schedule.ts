// 1. Визначення базових типів

// a) Дні тижня
type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

// b) Часові слоти
type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";

// c) Типи занять
type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

// 2. Створення основних структур

// a) Професор
type Professor = {
    id: number;
    name: string;
    department: string;
};

// b) Аудиторія
type Classroom = {
    number: string;
    capacity: number;
    hasProjector: boolean;
};

// c) Курс
type Course = {
    id: number;
    name: string;
    type: CourseType;
};

// d) Заняття
type Lesson = {
    courseId: number;
    professorId: number;
    classroomNumber: string;
    dayOfWeek: DayOfWeek;
    timeSlot: TimeSlot;
};

// 3. Робота з масивами даних

let professors: Professor[] = [];
let classrooms: Classroom[] = [];
let courses: Course[] = [];
let schedule: Lesson[] = [];

// b) Додавання професора
function addProfessor(professor: Professor): void {
    professors.push(professor);
}

// 5. a) Тип конфлікту
type ScheduleConflict = {
    type: "ProfessorConflict" | "ClassroomConflict";
    lessonDetails: Lesson;
};

// 5. b) Валідація заняття (перевірка конфліктів)
function validateLesson(lesson: Lesson): ScheduleConflict | null {
    // Перевірка професора (чи не зайнятий він у цей час)
    const profConflict = schedule.find(l =>
        l.professorId === lesson.professorId &&
        l.dayOfWeek === lesson.dayOfWeek &&
        l.timeSlot === lesson.timeSlot
    );

    if (profConflict) {
        return {
            type: "ProfessorConflict",
            lessonDetails: profConflict
        };
    }

    // Перевірка аудиторії (чи не зайнята вона у цей час)
    const roomConflict = schedule.find(l =>
        l.classroomNumber === lesson.classroomNumber &&
        l.dayOfWeek === lesson.dayOfWeek &&
        l.timeSlot === lesson.timeSlot
    );

    if (roomConflict) {
        return {
            type: "ClassroomConflict",
            lessonDetails: roomConflict
        };
    }

    return null;
}

// 3. c) Додавання заняття з перевіркою
function addLesson(lesson: Lesson): boolean {
    const conflict = validateLesson(lesson);
    if (conflict) {
        console.log(`Помилка: Конфлікт розкладу (${conflict.type})`);
        return false;
    }

    schedule.push(lesson);
    return true;
}

// 4. Функції пошуку та фільтрації

// a) Пошук вільних аудиторій
function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
    // Знаходимо зайняті аудиторії в цей час
    const takenRooms = schedule
        .filter(l => l.dayOfWeek === dayOfWeek && l.timeSlot === timeSlot)
        .map(l => l.classroomNumber);

    // Фільтруємо всі аудиторії, виключаючи зайняті
    return classrooms
        .filter(room => !takenRooms.includes(room.number))
        .map(room => room.number);
}

// b) Розклад професора
function getProfessorSchedule(professorId: number): Lesson[] {
    return schedule.filter(l => l.professorId === professorId);
}

// 6. Аналіз та звіти

// a) Використання аудиторії (у відсотках)
function getClassroomUtilization(classroomNumber: string): number {
    const lessonsInRoom = schedule.filter(l => l.classroomNumber === classroomNumber).length;

    // Всього слотів на тиждень: 5 днів * 5 слотів = 25
    const totalSlots = 25;

    return (lessonsInRoom / totalSlots) * 100;
}

// b) Найпопулярніший тип занять
function getMostPopularCourseType(): CourseType {
    const counts = {
        "Lecture": 0,
        "Seminar": 0,
        "Lab": 0,
        "Practice": 0
    };

    schedule.forEach(lesson => {
        const course = courses.find(c => c.id === lesson.courseId);
        if (course) {
            counts[course.type]++;
        }
    });

    // Знаходимо тип з максимальною кількістю
    let maxCount = 0;
    let popularType: CourseType = "Lecture"; // Значення за замовчуванням

    for (const type in counts) {
        // Приведення типу, бо for..in дає string
        const currentType = type as CourseType;
        if (counts[currentType] > maxCount) {
            maxCount = counts[currentType];
            popularType = currentType;
        }
    }

    return popularType;
}

// 7. Модифікація даних

// a) Зміна аудиторії
function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
    // Оскільки в Lesson немає id, припустимо, що ми шукаємо урок за індексом або ідентифікуємо його посилання (але тут передається number).
    // Для навчальних цілей я буду вважати, що lessonId це індекс у масиві schedule.

    const lesson = schedule[lessonId];
    if (!lesson) return false;

    // Створюємо копію уроку зі зміненою аудиторією для перевірки
    const newLessonConfig = { ...lesson, classroomNumber: newClassroomNumber };

    // Перевіряємо чи нова аудиторія вільна
    const conflict = validateLesson(newLessonConfig);

    if (!conflict) {
        schedule[lessonId].classroomNumber = newClassroomNumber;
        return true;
    }

    return false;
}

// b) Скасування заняття
function cancelLesson(lessonId: number): void {
    // Знову ж таки, припускаємо що lessonId - це індекс масиву
    if (lessonId >= 0 && lessonId < schedule.length) {
        schedule.splice(lessonId, 1);
    }
}

// --- ТЕСТУВАННЯ (Демонстрація роботи) ---

// Додаємо дані
classrooms.push({ number: "101", capacity: 30, hasProjector: true });
classrooms.push({ number: "102", capacity: 20, hasProjector: false });

courses.push({ id: 1, name: "Intro to TS", type: "Lecture" });
courses.push({ id: 2, name: "Advanced TS", type: "Lab" });

addProfessor({ id: 1, name: "Dr. Smith", department: "CS" });
addProfessor({ id: 2, name: "Mr. Doe", department: "Math" });

// Додаємо заняття
console.log("Adding lesson 1:", addLesson({
    courseId: 1,
    professorId: 1,
    classroomNumber: "101",
    dayOfWeek: "Monday",
    timeSlot: "8:30-10:00"
})); // True

// Спробуємо додати конфлікт (той самий час і професор)
console.log("Adding conflicting lesson:", addLesson({
    courseId: 2,
    professorId: 1,
    classroomNumber: "102",
    dayOfWeek: "Monday",
    timeSlot: "8:30-10:00"
})); // False, conflict

// Перевірка вільних аудиторій
console.log("Available rooms Monday 8:30:", findAvailableClassrooms("8:30-10:00", "Monday"));
// Має бути ["102"], бо 101 зайнята

// Звіт
console.log("Professor 1 schedule:", getProfessorSchedule(1));
console.log("Room 101 utilization:", getClassroomUtilization("101") + "%");
console.log("Most popular type:", getMostPopularCourseType());

