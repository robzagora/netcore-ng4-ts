export class AppRoute {

    constructor(private path: string, private friendlyName: string, private iconName: string = '', private mainNavRoutable: boolean = true) {
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

    isMainNavRoutable(): boolean {
        return this.mainNavRoutable;
    }
}