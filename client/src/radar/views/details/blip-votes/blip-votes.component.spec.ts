import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlipVotesComponent } from './blip-votes.component';

describe('BlipVotesComponent', () => {
  let component: BlipVotesComponent;
  let fixture: ComponentFixture<BlipVotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlipVotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlipVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
