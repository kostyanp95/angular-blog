/**
 * Интерфейс юзера
 */
export interface User {
    email: string;
    password: string;
}

/**
 * Интерфейс для работы с FireBase
 */
export interface FireBaseAuth {
    idToken: string;
}
