import { TestBed } from '@angular/core/testing';
import { RadarComponent } from './radar.component';

describe('RadarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadarComponent],
    }).compileComponents();
  });

  it('should create the radar app', () => {
    const fixture = TestBed.createComponent(RadarComponent);
    const radar = fixture.componentInstance;
    expect(radar).toBeTruthy();
  });
});
