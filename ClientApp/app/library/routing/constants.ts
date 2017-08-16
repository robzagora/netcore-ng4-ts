
import { AppRoute } from './app.route';

export const Home: string = 'Home',
    About: string = 'About',
    Visualisation: string = 'Visualisation',
    Profile: string = 'Profile',
    Registration: string = 'Registration',
    NotFound: string = '404',
    Chat: string = 'Chat';

export const FullPathMatching: string = 'full';

export const AppRoutes: AppRoute[] = [
    new AppRoute(Home, 'Home', 'home'),
    new AppRoute(About, 'About', 'info'),
    new AppRoute(Visualisation, 'Visualisation', 'gavel'),
    new AppRoute(Profile, 'Profile', 'account_circle', false),
    new AppRoute(Registration, 'Registration', 'create', false),
    new AppRoute(NotFound, 'Not Found', 'announcement', false),
];