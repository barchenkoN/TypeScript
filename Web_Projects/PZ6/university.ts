/**
 * Практична робота №6
 * Тема: TypeScript Enums, Interfaces, Classes
 * University Management System
 */

// 1. Enums (Перелічувані типи)

enum StudentStatus {
    Active = "Active",
    Academic_Leave = "Academic_Leave",
    Graduated = "Graduated",
    Expelled = "Expelled"
}

enum CourseType {
    Mandatory = "Mandatory",
    Optional = "Optional",
    Special = "Special"
}

enum Semester {
    First = "First",
    Second = "Second"
}

enum GradeScore {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2
}

enum Faculty {
    Computer_Science = "Computer_Science",
    Economics = "Economics",
    Law = "Law",
    Engineering = "Engineering"
}

// 2. Interfaces

interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
}

interface GradeEntry {
    studentId: number;
    courseId: number;
    grade: GradeScore;
    date: Date;
    semester: Semester;
}

// 3. University Management System Class

class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: GradeEntry[] = [];
    private courseRegistrations: { studentId: number; courseId: number }[] = [];

    private currentIdCounter = 1;

    // --- Методи управління студентами ---

    enrollStudent(studentData: Omit<Student, "id">): Student {
        const newStudent: Student = {
            id: this.currentIdCounter++,
            ...studentData
        };
        this.students.push(newStudent);
        console.log(`Студента ${newStudent.fullName} зараховано на факультет ${newStudent.faculty}.`);
        return newStudent;
    }

    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.findStudent(studentId);
        if (!student) {
            console.error(`Студента з ID ${studentId} не знайдено.`);
            return;
        }

        // Валідація переходу статусів
        if (student.status === StudentStatus.Expelled && newStatus === StudentStatus.Active) {
            console.warn(`Неможливо перевести відрахованого студента ${student.fullName} в статус Active без поновлення.`);
        }

        student.status = newStatus;
        console.log(`Статус студента ${student.fullName} оновлено на ${newStatus}.`);
    }

    // --- Методи управління курсами ---

    addCourse(course: Course): void {
        this.courses.push(course);
    }

    registerForCourse(studentId: number, courseId: number): void {
        const student = this.findStudent(studentId);
        const course = this.findCourse(courseId);

        if (!student || !course) {
            console.error("Помилка реєстрації: Студента або курс не знайдено.");
            return;
        }

        // Перевірка статусу студента
        if (student.status !== StudentStatus.Active) {
            console.error(`Студент ${student.fullName} не має статусу Active.`);
            return;
        }

        // Перевірка факультету (для обов'язкових курсів)
        if (course.type === CourseType.Mandatory && student.faculty !== course.faculty) {
            console.error(`Курс ${course.name} доступний тільки для факультету ${course.faculty}.`);
            return;
        }

        // Перевірка місткості курсу
        const currentStudentsCount = this.courseRegistrations.filter(r => r.courseId === courseId).length;
        if (currentStudentsCount >= course.maxStudents) {
            console.error(`На курсі ${course.name} немає вільних місць.`);
            return;
        }

        // Успішна реєстрація
        this.courseRegistrations.push({ studentId, courseId });
        console.log(`Студента ${student.fullName} зареєстровано на курс ${course.name}.`);
    }

    // --- Методи оцінювання ---

    setGrade(studentId: number, courseId: number, grade: GradeScore): void {
        const isRegistered = this.courseRegistrations.some(r => r.studentId === studentId && r.courseId === courseId);

        if (!isRegistered) {
            console.error(`Помилка: Студент ID ${studentId} не зареєстрований на курс ID ${courseId}.`);
            return;
        }

        const course = this.findCourse(courseId);

        const newGrade: GradeEntry = {
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: course ? course.semester : Semester.First // Fallback
        };

        this.grades.push(newGrade);
        console.log(`Оцінку ${grade} виставлено студенту ID ${studentId} за курс ID ${courseId}.`);
    }

    // --- Звіти та аналітика ---

    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }

    getStudentGrades(studentId: number): GradeEntry[] {
        return this.grades.filter(g => g.studentId === studentId);
    }

    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(c =>
            c.semester === semester &&
            (c.faculty === faculty || c.type !== CourseType.Mandatory) // Доступні свої або загальні
        );
    }

    calculateAverageGrade(studentId: number): number {
        const studentGrades = this.getStudentGrades(studentId);
        if (studentGrades.length === 0) return 0;

        const sum = studentGrades.reduce((acc, curr) => acc + curr.grade, 0);
        return parseFloat((sum / studentGrades.length).toFixed(2));
    }

    getTopStudentsByFaculty(faculty: Faculty): Student[] {
        const facultyStudents = this.getStudentsByFaculty(faculty);
        // Фільтруємо тих, у кого середній бал >= 4.5
        return facultyStudents.filter(s => this.calculateAverageGrade(s.id) >= 4.5);
    }

    // --- Допоміжні методи ---
    private findStudent(id: number): Student | undefined {
        return this.students.find(s => s.id === id);
    }

    private findCourse(id: number): Course | undefined {
        return this.courses.find(c => c.id === id);
    }
}

// === ДЕМОНСТРАЦІЯ ===

const university = new UniversityManagementSystem();

console.log("=== 1. Зарахування студентів ===");
const student1 = university.enrollStudent({
    fullName: "Петренко Іван",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "CS-101"
});

const student2 = university.enrollStudent({
    fullName: "Сидоренко Марія",
    faculty: Faculty.Economics,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "EC-101"
});

console.log("\n=== 2. Створення курсів ===");
const courseJS = {
    id: 101,
    name: "TypeScript Basics",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 30
};

const courseEcon = {
    id: 102,
    name: "Microeconomics",
    type: CourseType.Mandatory,
    credits: 4,
    semester: Semester.First,
    faculty: Faculty.Economics,
    maxStudents: 50
};

university.addCourse(courseJS);
university.addCourse(courseEcon);

console.log("\n=== 3. Реєстрація на курси ===");
// Успішна реєстрація
university.registerForCourse(student1.id, courseJS.id);

// Помилка реєстрації (невірний факультет)
university.registerForCourse(student2.id, courseJS.id);

console.log("\n=== 4. Виставлення оцінок ===");
university.setGrade(student1.id, courseJS.id, GradeScore.Excellent);
university.setGrade(student1.id, courseJS.id, GradeScore.Good);

console.log("\n=== 5. Аналітика ===");
console.log(`Середній бал студента ${student1.fullName}: ${university.calculateAverageGrade(student1.id)}`); // (5+4)/2 = 4.5

const topCS = university.getTopStudentsByFaculty(Faculty.Computer_Science);
console.log("Відмінники CS:", topCS.map(s => s.fullName));
