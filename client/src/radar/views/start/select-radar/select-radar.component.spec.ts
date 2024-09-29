import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRadarComponent } from './select-radar.component';

describe('SelectRadarComponent', () => {
  let component: SelectRadarComponent;
  let fixture: ComponentFixture<SelectRadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectRadarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
