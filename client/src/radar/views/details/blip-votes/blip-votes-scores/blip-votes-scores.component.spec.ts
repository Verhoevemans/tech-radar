import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlipVotesScoresComponent } from './blip-votes-scores.component';

describe('BlipVotesScoresComponent', () => {
  let component: BlipVotesScoresComponent;
  let fixture: ComponentFixture<BlipVotesScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlipVotesScoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlipVotesScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
