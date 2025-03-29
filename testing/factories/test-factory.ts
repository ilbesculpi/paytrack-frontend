import { CustomerFactory } from "./customer-factory";

export class TestFactory {

    static get customer(): typeof CustomerFactory {
        return CustomerFactory;
    }

}
