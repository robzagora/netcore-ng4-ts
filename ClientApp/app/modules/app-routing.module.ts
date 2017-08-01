import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './../components/home/home.component';
import { AboutComponent } from './../components/about/about.component';
import { VisualisationComponent } from './../components/visualisation/visualisation.component';
import { ProfileComponent } from './../components/profile/profile.component';
import { RegistrationComponent } from './../components/registration/registration.component';
import { NotFoundComponent } from './../components/shared/not-found.component';

import { AppRoute } from './../library/routing/app.route';
import { Home, About, Visualisation, Profile, Registration, NotFound } from './../library/routing/constants';
import { AuthGuard } from './../library/auth/auth-guard';
import { LoggedInGuard } from './../library/auth/logged-in-guard';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: Home, }, // path cannot start with a slash
    { path: Home, component: HomeComponent },
    { path: About, component: AboutComponent },
    { path: Visualisation, component: VisualisationComponent },
    { path: Profile, component: ProfileComponent, canActivate: [AuthGuard] },
    { path: Registration, component: RegistrationComponent, canActivate: [LoggedInGuard] },
    { path: NotFound, component: NotFoundComponent },
    { path: '**', pathMatch: 'full', redirectTo: NotFound },
];

export const AppRoutes: AppRoute[] = [
    new AppRoute(Home, 'Home', 'home'),
    new AppRoute(About, 'About', 'info'),
    new AppRoute(Visualisation, 'Visualisation', 'gavel'),
    new AppRoute(Profile, 'Profile', 'account_circle', false),
    new AppRoute(Registration, 'Registration', 'create', false),
    new AppRoute(NotFound, 'Not Found', 'announcement', false),
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

export const routableComponents = [
    HomeComponent,
    AboutComponent,
    VisualisationComponent,
    ProfileComponent,
    RegistrationComponent,
    NotFoundComponent
];