import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AppRoute } from './../library/routing/app.route';
import { Home, Profile } from './../library/routing/constants';
import { AppRoutes } from './../modules/app-routing.module';

@Injectable()
export class NavService {

    constructor(private router: Router) {

    }

    getNavRoutableRoutes(): string[] {
        return AppRoutes
            .filter(route => route.isMainNavRoutable())
            .map(route => route.getPath());
    }

    getAppRoutes(): AppRoute[] {
        return AppRoutes.filter(route => route.isMainNavRoutable());
    }

    goToHome() {
        this.router.navigate([Home]);
    }

    goToProfile() {
        this.router.navigate([Profile]);
    }
}