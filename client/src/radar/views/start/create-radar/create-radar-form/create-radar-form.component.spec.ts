import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRadarFormComponent } from './create-radar-form.component';

describe('CreateRadarFormComponent', () => {
  let component: CreateRadarFormComponent;
  let fixture: ComponentFixture<CreateRadarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRadarFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRadarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
