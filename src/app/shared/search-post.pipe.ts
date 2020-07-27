import {Pipe, PipeTransform} from '@angular/core';
import {Post} from "./interfaces";

/**
 * Пайп для инпута поиска постов
 */
@Pipe({
    name: 'searchPost'
})
export class SearchPostPipe implements PipeTransform {

    transform(posts: Post[], search = ''): Post[] {
        if (!search.trim()) {
            return posts;
        }

        return posts.filter(post => post.titlePost.toLowerCase().includes(search.toLowerCase()))
    }

}
