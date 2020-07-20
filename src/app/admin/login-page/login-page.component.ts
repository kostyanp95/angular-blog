import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    /**
     * Форма авторизации
     */
    form: FormGroup;
    /**
     * Для защиты от многократной отправки формы
     */
    submitted = false;

    constructor(
        private auth: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ])
        });
    }

    /**
     * Сабмит формы авторизации
     */
    submit() {
        if (this.form.invalid) {
            return;
        }

        // Временная Блокировка кнопки после нажатия
        this.submitted = true;

        const user: User = {
            email: this.form.value.email,
            password: this.form.value.password
        };

        this.auth.login(user).subscribe(() => {
            this.form.reset();
            this.router.navigate(['/admin', 'dashboard']);
            // Разблокировка кнопки после ответа сервара
            this.submitted = false;
        });
    }
}

