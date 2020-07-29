import { Pipe, PipeTransform } from '@angular/core';
import { Post } from "../../../shared/interfaces";

/**
 * Пайп для инпута поиска постов
 */
@Pipe({
    name: 'searchPosts'
})
export class SearchPostPipe implements PipeTransform {

    transform(posts: Post[], search = ''): Post[] {
        if (!search.trim()) {
            return posts;
        }

        return posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
    }

}
