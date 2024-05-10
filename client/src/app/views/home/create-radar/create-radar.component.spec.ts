import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRadarComponent } from './create-radar.component';

describe('CreateRadarComponent', () => {
  let component: CreateRadarComponent;
  let fixture: ComponentFixture<CreateRadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRadarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
