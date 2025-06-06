import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlipVotesFormComponent } from './blip-votes-form.component';

describe('BlipVotesFormComponent', () => {
  let component: BlipVotesFormComponent;
  let fixture: ComponentFixture<BlipVotesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlipVotesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlipVotesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
