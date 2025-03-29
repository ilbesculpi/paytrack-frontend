import { Customer, CustomerJson } from "../../src/app/models";
import { faker } from '@faker-js/faker';

export class CustomerFactory {

    static createCustomer(props: Partial<CustomerJson> = {}): Customer {
        const json = Object.assign({
            id: faker.string.alphanumeric(10),
            full_name: faker.person.fullName(),
            email: faker.internet.email(),
            telephone: faker.phone.number()
        }, props);
        return new Customer(json);
    }

}
