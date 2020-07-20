import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../shared/interfaces';
import { Observable } from 'rxjs';

/**
 * Авторизация не нужна в главном модуле,
 * поэтому регистрируем на уровне админского модуля
 */
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
        return this.http.post('', user);
    }

    /**
     * Прототип метода выхода
     */
    logout(): void {

    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    /**
     * Прототип метода для изменения токена
     */
    private setToken(): void {

    }
}
