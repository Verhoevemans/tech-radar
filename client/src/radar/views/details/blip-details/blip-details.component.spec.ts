import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlipDetailsComponent } from './blip-details.component';

describe('BlipDetailsComponent', () => {
  let component: BlipDetailsComponent;
  let fixture: ComponentFixture<BlipDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlipDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
