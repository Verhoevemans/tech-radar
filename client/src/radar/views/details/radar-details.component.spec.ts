import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarDetailsComponent } from './radar-details.component';

describe('RadarDetailsComponent', () => {
  let component: RadarDetailsComponent;
  let fixture: ComponentFixture<RadarDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadarDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
