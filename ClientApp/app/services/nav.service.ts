import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AppRoute } from './../library/routing/app.route';
import { AppRoutes } from './../modules/app-routing.module';

@Injectable()
export class NavService {

    getUserRoutableRoutes(): string[] {
        return AppRoutes
            .filter(route => route.isUserRoutable())
            .map(route => route.getPath());
    }

    getAppRoutes(): AppRoute[] {
        return AppRoutes.filter(route => route.isUserRoutable());
    }
}