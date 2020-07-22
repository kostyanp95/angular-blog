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
            titlePost: [null, [Validators.required]],
            textPost: [null, [Validators.required]],
            authorPost: [null, [Validators.required]],
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
            titlePost: this.createPostForm.value.titlePost,
            textPost: this.createPostForm.value.textPost,
            authorPost: this.createPostForm.value.authorPost,
            datePost: new Date(),
        };

        console.log(post);
    }

}
