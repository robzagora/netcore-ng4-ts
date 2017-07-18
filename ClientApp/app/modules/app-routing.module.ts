import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './../components/home/home.component';
import { AboutComponent } from './../components/about/about.component';
import { VisualisationComponent } from './../components/visualisation/visualisation.component';

import { AppRoute } from './../library/routing/app.route';
import { Home, About, Visualisation, NotFound } from './../library/routing/constants';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: Home, }, // path cannot start with a slash
    { path: Home, component: HomeComponent },
    { path: About, component: AboutComponent },
    { path: Visualisation, component: VisualisationComponent },
    { path: '**', pathMatch: 'full', redirectTo: Home },
];

export const AppRoutes: AppRoute[] = [
    new AppRoute(Home, 'Home', 'home'),
    new AppRoute(About, 'About', 'info'),
    new AppRoute(Visualisation, 'Visualisation', 'gavel'),
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

export const routableComponents = [
    HomeComponent,
    AboutComponent,
    VisualisationComponent
];