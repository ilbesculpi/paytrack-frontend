import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { authResolver } from './auth.resolver';
import { User } from '../../models';

describe('authResolver', () => {

    const executeResolver: ResolveFn<User|null> = (...resolverParameters) =>
        TestBed.runInInjectionContext(() =>
            authResolver(...resolverParameters)
        );

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should be created', () => {
        expect(executeResolver).toBeTruthy();
    });

});
