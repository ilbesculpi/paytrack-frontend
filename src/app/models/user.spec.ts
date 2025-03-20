import { User } from './user';

describe('User', () => {

    it('should create an instance', () => {
        expect(new User({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@localhost.com'
        })).toBeTruthy();
    });

    it('should set base properties', () => {
        const user = new User({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com'
        });
        expect(user.id).toEqual(1);
        expect(user.name).toEqual('John Doe');
        expect(user.email).toEqual('johndoe@example.com');
    });

});
