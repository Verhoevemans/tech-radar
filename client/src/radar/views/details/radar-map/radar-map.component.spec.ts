import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarMapComponent } from './radar-map.component';

describe('RadarMapComponent', () => {
  let component: RadarMapComponent;
  let fixture: ComponentFixture<RadarMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadarMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadarMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
