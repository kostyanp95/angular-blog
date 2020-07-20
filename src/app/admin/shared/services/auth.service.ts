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
     * Прототип метода получения токена с свервера
     */
    get token(): string {
        return '';
    }

    /**
     * Прототип метода входа
     */
    login(user: User): Observable<any> {
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken)
            );
    }

    /**
     * Прототип метода выхода
     */
    logout(): void {

    }

    /**
     * Если аутентификация успешная
     */
    isAuthenticated(): boolean {
        return !!this.token;
    }

    /**
     * Прототип метода для изменения токена
     */
    private setToken(response: FireBaseAuth) {
        console.log(response);
    }
}
