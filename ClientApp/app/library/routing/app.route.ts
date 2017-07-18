export class AppRoute {

    constructor(private path: string, private friendlyName: string, private iconName: string = '', private userRoutable: boolean = true) {
    }

    getPath(): string {
        return this.path;
    }

    getFriendlyName(): string {
        return this.friendlyName;
    }

    getIconName(): string {
        return this.iconName;
    }

    isUserRoutable(): boolean {
        return this.userRoutable;
    }
}