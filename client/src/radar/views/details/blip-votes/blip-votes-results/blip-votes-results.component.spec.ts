import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlipVotesResultsComponent } from './blip-votes-results.component';

describe('BlipVotesResultsComponent', () => {
  let component: BlipVotesResultsComponent;
  let fixture: ComponentFixture<BlipVotesResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlipVotesResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlipVotesResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
