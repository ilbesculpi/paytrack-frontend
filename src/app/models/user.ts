export interface UserJson {
    id?: number;
    name: string;
    email: string;
    created_at?: string;
    updated_at?: string;
}

export class User {

    id?: number;
    name: string = '';
    email: string = '';
    created_at?: string;
    updated_at?: string;

    constructor(data: Partial<UserJson>) {
        Object.assign(this, data);
    }

    get avatarUrl(): string {
        return `https://gravatar.com/avatar/${this.name}?s=400&d=robohash&r=x`;
    }

}
