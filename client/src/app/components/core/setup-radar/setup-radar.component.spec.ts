import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupRadarComponent } from './setup-radar.component';

describe('SetupRadarComponent', () => {
  let component: SetupRadarComponent;
  let fixture: ComponentFixture<SetupRadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupRadarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
