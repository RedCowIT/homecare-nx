import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Component} from '@angular/core';
import {Auth0Guard, Auth0Service} from '@homecare/auth0';
import {Router, Routes} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Location} from '@angular/common';
import {of} from 'rxjs';

@Component({
  selector: 'homecare-nx-blank',
  template: '',
  styles: ['']
})
class BlankCmp {
}

const routes: Routes = [
  {path: '', component: BlankCmp},
  {path: 'login', component: BlankCmp},
  {path: 'foo', component: BlankCmp, canActivate: [Auth0Guard]},
  {path: 'foo/:fooId/bar/:barId', component: BlankCmp, canActivate: [Auth0Guard]}
];

describe('Auth0Guard', () => {

  const setup = (authenticates: boolean) => {

    let router: Router;
    let location: Location;
    let fixture: any;
    let guard: Auth0Guard;

    const auth0Service = {
      login: jest.fn(),
      get isAuthenticated$() {
        return of(authenticates);
      }
    };

    TestBed.configureTestingModule({
      declarations: [BlankCmp],
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        Auth0Guard,
        {provide: Auth0Service, useValue: auth0Service}
      ]
    });

    guard = TestBed.inject(Auth0Guard);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(BlankCmp);
    fixture.detectChanges();

    fixture.ngZone.run(() => {
      router.initialNavigation();
    });

    return {
      router, location, fixture, guard, auth0Service
    }
  };

  beforeEach(() => {

  });

  test('should be created', fakeAsync(() => {
    const module = setup(true);
    expect(module.guard).toBeTruthy();
  }));

  test('calls login with simple target path if unauthenticated', fakeAsync(() => {

    const module = setup(false);

    module.fixture.ngZone.run(() => {
      module.fixture.whenStable().then(() => {
        module.router.navigate(['foo']).then(() => {

          tick(10);

          expect(module.auth0Service.login).toHaveBeenLastCalledWith('/foo');
          expect(module.location.path()).toEqual('/');

        });
      });
    });

  }));

  test('calls login with complex target path if unauthenticated', fakeAsync(() => {

    const module = setup(false);

    module.fixture.ngZone.run(() => {
      module.fixture.whenStable().then(() => {
        module.router.navigate(['foo', 1, "bar", 2]).then(() => {

          tick(10);

          expect(module.auth0Service.login).toHaveBeenLastCalledWith('/foo/1/bar/2');
          expect(module.location.path()).toEqual('/');

        });
      });
    });

  }));

  test('should activate if authenticated', fakeAsync(() => {

    const module = setup(true);

    module.fixture.ngZone.run(() => {
      module.fixture.whenStable().then(() => {
        module.router.navigate(['foo']).then(() => {

          tick(10);

          expect(module.auth0Service.login).not.toHaveBeenCalled();
          expect(module.location.path()).toEqual('/foo');

        });
      });
    });

  }));

});
