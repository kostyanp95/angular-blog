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

export interface Post {
    idPost?: string;
    titlePost: string;
    textPost: string;
    authorPost: string;
    datePost: Date;
}
