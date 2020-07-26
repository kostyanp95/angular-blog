import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FbCreateResponse, Post} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

/**
 * Сервис для работы с постами
 */
@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) {
    }

    /**
     * Создание поста в безе данных
     */
    createPostInDataBase(post: Post): Observable<Post> {
        return this.http.post(`${environment.fireBaseDB}/posts.json`, post)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...post,
                    idPost: response.name,
                    datePost: new Date(post.datePost)
                };
            }));
    }

    /**
     * Получить все посты с сервера
     */
    getAllPosts(): Observable<Post[]> {
        return this.http.get(`${environment.fireBaseDB}/posts.json`)
            .pipe(map((response: {[key: string]: any}) => {
                return Object
                    .keys(response)
                    .map(key => ({
                        ...response[key],
                        id: key,
                        date: new Date(response[key].date)
                    }))
            }))
    }
}
