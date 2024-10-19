import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlipDetailsFormComponent } from './blip-details-form.component';

describe('BlipDetailsFormComponent', () => {
  let component: BlipDetailsFormComponent;
  let fixture: ComponentFixture<BlipDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlipDetailsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlipDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
