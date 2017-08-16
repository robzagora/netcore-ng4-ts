import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './../components/home/home.component';
import { AboutComponent } from './../components/about/about.component';
import { VisualisationComponent } from './../components/visualisation/visualisation.component';
import { ProfileComponent } from './../components/profile/profile.component';
import { RegistrationComponent } from './../components/registration/registration.component';
import { NotFoundComponent } from './../components/shared/not-found.component';

import { Home, About, Visualisation, Profile, Registration, NotFound, Chat, FullPathMatching } from './../library/routing/constants';
import { AuthGuard } from './../library/auth/auth-guard';
import { LoggedInGuard } from './../library/auth/logged-in-guard';

import { SignalrConnectionResolver } from './../library/chat/signalr-connection-resolver';

const routes: Routes = [
    { path: '', pathMatch: FullPathMatching, redirectTo: Home, }, // path cannot start with a slash
    { path: Home, component: HomeComponent },
    {
        path: About,
        component: AboutComponent
    },
    { path: Visualisation, component: VisualisationComponent },
    { path: Profile, component: ProfileComponent, canActivate: [AuthGuard], resolve: { connection: SignalrConnectionResolver } },
    { path: Registration, component: RegistrationComponent, canActivate: [LoggedInGuard] },
    { path: NotFound, component: NotFoundComponent },
    { path: '**', pathMatch: FullPathMatching, redirectTo: NotFound },
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