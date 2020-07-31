import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

export type AlertType = 'success' | 'warning' | 'danger';

/**
 * Уведомление
 */
export interface Alert {
    type: AlertType,
    text: string
}

/**
 * Сервис уведомлений
 */
@Injectable()
export class AlertService {
    public alert$ = new Subject<Alert>()

    success(text: string) {
        this.alert$.next({type: 'success', text});
    }

    warning(text: string) {
        this.alert$.next({type: 'warning', text});
    }

    danger(text: string) {
        this.alert$.next({type: 'danger', text});
    }
}
