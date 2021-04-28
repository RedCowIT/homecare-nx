import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogoutSuccessPage } from './logout-success.page';

describe('LogoutSuccessPage', () => {
  let component: LogoutSuccessPage;
  let fixture: ComponentFixture<LogoutSuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutSuccessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
