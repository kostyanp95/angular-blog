import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FireBaseAuth, User } from '../../../shared/interfaces';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';

/**
 * Сервис для авторизации
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public error$: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient) {
    }

    /**
     * Получения токена с свервера
     * и рассчет времени хранения
     */
    get token(): string {
        const expDate = new Date(localStorage.getItem('FireBase-token-exp'));
        if (new Date() > expDate) {
            this.logout();
            return null;
        }
        return localStorage.getItem('FireBase-token');
    }

    /**
     * Вход
     */
    login(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken),
                catchError(this.handleError.bind(this))
            );
    }

    /**
     * Выход
     */
    logout(): void {
        this.setToken(null);
    }

    /**
     * Если аутентификация успешная
     */
    isAuthenticated(): boolean {
        return !!this.token;
    }

    /**
     * Обработка Ошибок
     */
    private handleError(error: HttpErrorResponse) {
        const {message} = error.error.error;

        switch (message) {
            case 'INVALID_EMAIL':
                this.error$.next('Неверный Email');
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('Неверный пароль');
                break;
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Такого email нет');
                break;
        }

        return throwError(error);
    }

    /**
     *  Изменение токена
     *  или чистка при истечении времени хранения
     */
    private setToken(response: FireBaseAuth | null) {
        if (response) {
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
            localStorage.setItem('FireBase-token', response.idToken);
            localStorage.setItem('FireBase-token-exp', expDate.toString());
        } else {
            localStorage.clear();
        }
    }
}
