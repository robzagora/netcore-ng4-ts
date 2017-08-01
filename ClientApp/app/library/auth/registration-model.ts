export class RegistrationModel {
    constructor(
        private name: string,
        private surname: string,
        private username: string,
        private email: string,
        private password: string) {
    }

    getName(): string {
        return this.name;
    }

    getSurname(): string {
        return this.surname;
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }
}