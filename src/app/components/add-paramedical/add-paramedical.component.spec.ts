import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddParamedicalComponent } from './add-paramedical.component';

describe('AddParamedicalComponent', () => {
  let component: AddParamedicalComponent;
  let fixture: ComponentFixture<AddParamedicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParamedicalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddParamedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
