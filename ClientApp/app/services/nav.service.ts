import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AppRoute } from './../library/routing/app.route';
import { Home, Profile, Registration } from './../library/routing/constants';
import { AppRoutes } from './../modules/app-routing.module';

@Injectable()
export class NavService {

    constructor(private router: Router, private location: Location) {

    }

    getMainNavPaths(): string[] {
        return AppRoutes
            .filter(route => route.isMainNavRoutable())
            .map(route => route.getPath());
    }

    getMainNavRoutes(): AppRoute[] {
        return AppRoutes.filter(route => route.isMainNavRoutable());
    }

    goToHome() {
        this.router.navigate([Home]);
    }

    goToProfile() {
        this.router.navigate([Profile]);
    }

    goToRegistration() {
        this.router.navigate([Registration]);
    }

    goBack() {
        this.location.back();
    }
}