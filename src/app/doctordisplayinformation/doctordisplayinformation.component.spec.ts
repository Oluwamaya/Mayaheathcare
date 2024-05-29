import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctordisplayinformationComponent } from './doctordisplayinformation.component';

describe('DoctordisplayinformationComponent', () => {
  let component: DoctordisplayinformationComponent;
  let fixture: ComponentFixture<DoctordisplayinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctordisplayinformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctordisplayinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
