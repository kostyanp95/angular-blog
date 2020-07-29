/**
 * Интерфейс юзера
 */
export interface User {
    email: string;
    password: string;
    returnSecureToken?: boolean;
}

/**
 * Интерфейс для работы с FireBase
 */
export interface FireBaseAuth {
    idToken: string;
    expiresIn: string;
}

/**
 * Интерфейс поста
 */
export interface Post {
    id?: string;
    title: string;
    text: string;
    author: string;
    date: Date;
}

/**
 * Интерфейс для ответа сервера
 */
export interface FbCreateResponse {
    name: string;
}
