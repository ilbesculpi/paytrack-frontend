import { convertToParamMap, Params } from "@angular/router";
import { Observable, of } from "rxjs";

interface ActiveRouteOptions {
    queryParams?: Params;
    params?: Params;
    data?: any;
}

export interface ActiveRouteStub {
    queryParamMap?: Observable<Params>;
    paramMap?: Observable<Params>;
    data?: Observable<any>;
    snapshot: {
        queryParamMap?: any;
        paramMap?: any;
        data?: any;
    }
}

export class TestUtils {

    static getActiveRouteStub(options: ActiveRouteOptions): ActiveRouteStub {
        const stub: ActiveRouteStub = { snapshot: {} }
        if( options.queryParams ) {
            const paramMap = convertToParamMap(options.queryParams);
            stub.queryParamMap = of(paramMap);
        }
        else {
            stub.queryParamMap = of({});
        }

        if( options.params ) {
            const paramMap = convertToParamMap(options.params);
            stub.paramMap = of(paramMap);
        }
        else {
            stub.paramMap = of({});
        }

        if( options.data ) {
            stub.data = of( options.data );
        }
        else {
            stub.data = of({});
        }

        stub.snapshot = {
            queryParamMap: options.queryParams,
            paramMap: options.params,
            data: options.data
        }

        return stub;
    }

}
