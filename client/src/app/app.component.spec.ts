import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('RadarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the radar app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const radar = fixture.componentInstance;
    expect(radar).toBeTruthy();
  });
});
