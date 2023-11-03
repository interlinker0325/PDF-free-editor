import { selector } from 'gql';

export const GET_USER_LOGIN_DATA = email => `
    user(filter: { email: { eq: "${email}" } }) {
        ${selector.user.USER_LOGIN_DATA}
    }
`;

export const GET_PRIVATE_USER_PROFILE = (id) => `
    user(filter: { id: { eq: "${id}" } }) {
        ${selector.user.PRIVATE_USER_PROFILE}
    }
`;

export const GET_PUBLIC_USER_PROFILE = (id) => `
    user(filter: { id: { eq: "${id}" } }) {
        ${selector.user.PUBLIC_USER_PROFILE}
    }
`;

export const GET_USER_COURSES = (id) => `
    allCourses(
        filter: { 
            OR: [
                { students: { anyIn: ["${id}"] } },
                { professor: { eq: "${id}" } }
            ]
        }) {
        ${selector.courses.USER_COURSES}
    }
`;

export const GET_STUDENT_COURSES = (id) => `
    allCourses(filter: { students: { anyIn: ["${id}"] } }) {
        ${selector.courses.USER_COURSES}
    }
`;

export const GET_PROFESOR_COURSES = (id) => `
    allCourses(filter: {professor: {eq: "${id}"}}) {
        ${selector.courses.PROFESOR_COURSES}
    }
`;

export const GET_USER_POSTS = (id) => `
    allPosts(
        filter: { 
            OR: [
                { author: { eq: "${id}" } },
                { coauthors: { anyIn: ["${id}"] } }
            ]
        }) {
        ${selector.posts.POSTS_OF_USER}
    }
`;
