import { Customer } from './customer';

describe('Customer', () => {

    it('should create an instance', () => {
        expect(new Customer({})).toBeTruthy();
    });

    it('should set base properties', () => {
        const customer = new Customer({
            id: '1',
            full_name: 'John Doe',
            document_id: '123456789',
            telephone: '123456789',
            email: 'johndoe@example.com',
            address: '123 Main St',
            notes: 'Some notes'
        });
        expect(customer.id).toEqual('1');
        expect(customer.full_name).toEqual('John Doe');
        expect(customer.document_id).toEqual('123456789');
        expect(customer.telephone).toEqual('123456789');
        expect(customer.email).toEqual('johndoe@example.com');
        expect(customer.address).toEqual('123 Main St');
        expect(customer.notes).toEqual('Some notes');
    });

});
