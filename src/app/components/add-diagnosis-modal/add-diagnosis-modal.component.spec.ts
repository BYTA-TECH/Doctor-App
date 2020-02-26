import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDiagnosisModalComponent } from './add-diagnosis-modal.component';

describe('AddDiagnosisModalComponent', () => {
  let component: AddDiagnosisModalComponent;
  let fixture: ComponentFixture<AddDiagnosisModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiagnosisModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDiagnosisModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
