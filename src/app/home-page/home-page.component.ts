import { Component, OnInit } from '@angular/core';
import { PostsService } from '../shared/posts.service';
import { Observable } from 'rxjs';
import { Post } from '../shared/interfaces';

/**
 * Компонент отображающий список постов
 * для обычных юзеров
 */
@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    /**
     * Массив постов
     */
    posts$: Observable<Post[]>;

    constructor(private postsService: PostsService) {
    }

    ngOnInit() {
        // Инициализация постов
        this.posts$ = this.postsService.getAllPosts();
    }

}
