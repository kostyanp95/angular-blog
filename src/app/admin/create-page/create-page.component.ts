import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../shared/interfaces';

/**
 * Компонет с формой для создания поста
 */
@Component({
    selector: 'app-create-page',
    templateUrl: './create-page.component.html',
    styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

    /**
     * Форма создания поста
     */
    createPostForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        /**
         * Инициализация формы создания поста
         */
        this.createPostForm = this.fb.group({
            title: [null, [Validators.required]],
            text: [null, [Validators.required]],
            author: [null, [Validators.required]],
        });
    }

    /**
     * Создание поста при клике на кнопку
     */
    createPost(): void {
        if (this.createPostForm.invalid) {
            return;
        }

        // Создание поста на основе заполненных инпутов
        const post: Post = {
            title: this.createPostForm.value.title,
            text: this.createPostForm.value.text,
            author: this.createPostForm.value.author,
            date: new Date(),
        };
    }

}
