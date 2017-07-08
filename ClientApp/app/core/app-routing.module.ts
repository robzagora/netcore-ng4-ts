import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './../components/home/home.component';
import { AboutComponent } from './../components/about/about.component';

const Home = 'home',
    About = 'about',
    NotFound = '404';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: Home, }, // path cannot start with a slash
    { path: Home, component: HomeComponent },
    { path: About, component: AboutComponent },
    { path: '**', pathMatch: 'full', redirectTo: Home },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

export const routableComponents = [
    HomeComponent,
    AboutComponent,
];

export class AppRoute {

    constructor(private path: string, private friendlyName: string, private userRoutable: boolean = true) {
        this.path = path;
        this.friendlyName = friendlyName;
        this.userRoutable = userRoutable;
    }

    getPath() {
        return this.path;
    }

    getFriendlyName() {
        return this.friendlyName;
    }

    isUserRoutable() {
        return this.userRoutable;
    }
}

export const AppRoutes: AppRoute[] = [
    new AppRoute(Home, 'Home'),
    new AppRoute(About, 'About'),
];