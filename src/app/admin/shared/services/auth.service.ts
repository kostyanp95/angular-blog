import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FireBaseAuth, User } from '../../../shared/interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';

/**
 * Сервис для авторизации
 */
// Авторизация не нужна в главном модуле,
// поэтому регистрируем на уровне админского модуля
@Injectable()
export class AuthService {

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
                tap(this.setToken)
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
