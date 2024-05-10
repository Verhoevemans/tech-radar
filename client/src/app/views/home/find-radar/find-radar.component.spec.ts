import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindRadarComponent } from './find-radar.component';

describe('FindRadarComponent', () => {
  let component: FindRadarComponent;
  let fixture: ComponentFixture<FindRadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindRadarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
