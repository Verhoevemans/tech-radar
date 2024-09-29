import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRadarModalComponent } from './create-radar-modal.component';

describe('CreateRadarModalComponent', () => {
  let component: CreateRadarModalComponent;
  let fixture: ComponentFixture<CreateRadarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRadarModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRadarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
