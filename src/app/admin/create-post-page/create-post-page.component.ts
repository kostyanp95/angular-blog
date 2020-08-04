import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../shared/interfaces';
import { PostsService } from '../../shared/posts.service';
import { AlertService } from "../shared/services/alert.service";

/**
 * Компонет с формой для создания поста
 */
@Component({
    selector: 'app-create-page',
    templateUrl: './create-post-page.component.html',
    styleUrls: ['./create-post-page.component.scss']
})
export class CreatePostPageComponent implements OnInit {

    /**
     * Форма создания поста
     */
    createPostForm: FormGroup;

    constructor(private fb: FormBuilder,
                private postsService: PostsService,
                private alert: AlertService) {
    }

    ngOnInit(): void {
        // Инициализация формы создания поста
        this.createPostForm = this.fb.group({
            title: [null, Validators.required],
            text: [null, Validators.required],
            author: [null, Validators.required],
        });
    }

    /**
     * Создание объекта поста при клике на кнопку
     */
    createPost(): void {
        if (this.createPostForm.invalid) {
            return;
        }

        // Создание бъекта поста на основе заполненных инпутов
        const post: Post = {
            title: this.createPostForm.value.title,
            text: this.createPostForm.value.text,
            author: this.createPostForm.value.author,
            date: new Date(),
        };

        // Очистка полей при успешном создании поста
        this.postsService.createPostInDataBase(post).subscribe(() => {
            this.createPostForm.reset();
            this.alert.success('Пост был создан');
        });

        console.log('Созданный пост: ', post);
    }

}
