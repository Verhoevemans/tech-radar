import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlipListComponent } from './blip-list.component';

describe('BlipListComponent', () => {
  let component: BlipListComponent;
  let fixture: ComponentFixture<BlipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlipListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
