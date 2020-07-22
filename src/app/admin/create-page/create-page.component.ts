import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../shared/interfaces';

@Component({
    selector: 'app-create-page',
    templateUrl: './create-page.component.html',
    styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

    createPostForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.createPostForm = this.fb.group({
            title: [null, [Validators.required]],
            text: [null, [Validators.required]],
            author: [null, [Validators.required]],
        });
    }

    createPost(): void {
        if (this.createPostForm.invalid) {
            return;
        }

        const post: Post = {
            title: this.createPostForm.value.title,
            text: this.createPostForm.value.text,
            author: this.createPostForm.value.author,
            date: new Date(),
        };
    }

}
