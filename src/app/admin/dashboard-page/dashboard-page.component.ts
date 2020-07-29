import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from "../../shared/posts.service";
import { Post } from "../../shared/interfaces";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

    /**
     * Массив с постами с сервера
     */
    posts: Post[] = [];

    /**
     * Поисковый запрос в ипнуте поиска постов
     */
    searchTitlePost: string = '';

    /**
     * Для отписки от стрима постов
     */
    updatePostSub: Subscription;

    /**
     * Для отписки от удаления поста
     */
    deletePostSub: Subscription;

    constructor(private postsService: PostsService) {
    }

    ngOnInit(): void {
        // Подгрузка постов в дащборде
        this.updatePostSub = this.postsService.getAllPosts().subscribe(posts => {
            this.posts = posts;
        });
    }

    /**
     * Удалить пост
     */
    removePost(id: string): void {
        this.deletePostSub = this.postsService
            .removePost(id)
            .subscribe(() => {
                this.posts = this.posts.filter(post => post.id !== id);
            });
    }

    /**
     * Отписка
     */
    ngOnDestroy(): void {
        if (this.updatePostSub) {
            this.updatePostSub.unsubscribe();
        }

        if (this.deletePostSub) {
            this.deletePostSub.unsubscribe();
        }
    }
}
