import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitReviewComponent } from './submit-review.component';

describe('SubmitReviewComponent', () => {
  let component: SubmitReviewComponent;
  let fixture: ComponentFixture<SubmitReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
