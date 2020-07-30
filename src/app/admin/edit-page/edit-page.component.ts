import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { PostsService } from "../../shared/posts.service";
import { switchMap } from "rxjs/operators";
import { Post } from "../../shared/interfaces";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

/**
 * Компонент с формой редактирования поста
 */
@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

    /**
     * Форма редактирования поста
     */
    editPostForm: FormGroup;
    /**
     * Объект поста
     */
    post: Post;
    /**
     * Проверка редактирования форым
     */
    submitted: boolean = false;
    /**
     * Для отписки
     */
    updatePostSubscribe: Subscription;

    constructor(
        private route: ActivatedRoute,
        private postsService: PostsService,
    ) {
    }

    ngOnInit() {
        this.route.params.pipe(
            switchMap((params: Params) => {
                return this.postsService.getPostById(params['id'])
            })
        ).subscribe((post: Post) => {
            this.editPostForm = new FormGroup({
                title: new FormControl(post.title, Validators.required),
                text: new FormControl(post.text, Validators.required)
            })
        })
    }

    /**
     * Редактирование поста
     */
    editPost() {
        if (this.editPostForm.invalid) {
            return
        }

        // Переключение состояния флага
        this.submitted = true;

        // Записываем данные с полей формы
        this.updatePostSubscribe = this.postsService.updatePost({
            ...this.post,
            text: this.editPostForm.value.text,
            title: this.editPostForm.value.title,
        }).subscribe(() => {
            this.submitted = false;
        })
    }

    /**
     * Отписка от сктрима
     */
    ngOnDestroy(): void {
        this.updatePostSubscribe ? this.updatePostSubscribe.unsubscribe() : null;
    }
}
