import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class SnackbarService {

    private defaultDuration = 2000;
    private defaultActionText = 'Dismiss';

    constructor(public snackBar: MdSnackBar) {

    }

    showSnackbar(message: string, action: string = this.defaultActionText, duration: number = this.defaultDuration): void {
        this.snackBar.open(message, action, { duration: duration });
    }
}