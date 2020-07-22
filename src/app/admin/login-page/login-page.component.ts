import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    messageLogin: string;

    constructor(
        private fb: FormBuilder,
        public auth: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            if (params['loginAgain']) {
                this.messageLogin = 'Необходимо авторизоваться как администратор.';
            }
        });

        this.form = this.fb.group({
            email: ['',
                Validators.required,
                Validators.email
            ],
            password: ['',
                Validators.required,
                Validators.minLength(6)
            ]
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
        }, () => this.submitted = false);
    }
}

