export const USER_TYPE_NAMES = {
    SUPLENTE: 'Suplente',
    PROFESOR: 'Profesor',
    ESTUDIANTE: 'Estudiante',
    DIRECTOR: 'Director',
    ADMINISTRADOR: 'Administrador'
}

export const USER_TYPE_BY_ID = {
    '122038962': USER_TYPE_NAMES.SUPLENTE,
    '122038961': USER_TYPE_NAMES.PROFESOR,
    '122038960': USER_TYPE_NAMES.ESTUDIANTE,
    '122038959': USER_TYPE_NAMES.DIRECTOR,
    '122038958': USER_TYPE_NAMES.ADMINISTRADOR
};

export const isProfessor = (typeId) =>
    USER_TYPE_BY_ID[typeId] === USER_TYPE_NAMES.PROFESOR ||
    USER_TYPE_BY_ID[typeId] === USER_TYPE_NAMES.ADMINISTRADOR ||
    USER_TYPE_BY_ID[typeId] === USER_TYPE_NAMES.SUPLENTE;

export const isStudent = (typeId) =>
    USER_TYPE_BY_ID[typeId] === USER_TYPE_NAMES.ESTUDIANTE;

// export const userHasCourse = (user, courseId) => {
//     console.log('over here!!', user, courseId);
// }

export const isUserTeacherOfCourse = (user, courses) => {
    const teacherInCourse = courses.find(c => c.professor.id === user.id);
    return !!teacherInCourse;
}
