import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePostPageComponent } from './create-post-page/create-post-page.component';
import { EditPostPageComponent } from './edit-post-page/edit-post-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuardService } from './shared/services/auth.guard.service';
import { SearchPostPipe } from "./shared/services/search-post.pipe";
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from "./shared/services/alert.service";

@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        CreatePostPageComponent,
        EditPostPageComponent,
        SearchPostPipe,
        AlertComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children: [
                    {
                        path: '',
                        redirectTo: '/admin/login',
                        pathMatch: 'full'
                    },
                    {
                        path: 'login',
                        component: LoginPageComponent
                    },
                    {
                        path: 'dashboard',
                        component: DashboardPageComponent,
                        canActivate: [AuthGuardService]
                    },
                    {
                        path: 'create',
                        component: CreatePostPageComponent,
                        canActivate: [AuthGuardService]
                    },
                    {
                        path: 'post/:id/edit',
                        component: EditPostPageComponent,
                        canActivate: [AuthGuardService]
                    }
                ]
            }
        ]),
        SharedModule
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuardService,
        AlertService
    ]
})
export class AdminModule {

}
