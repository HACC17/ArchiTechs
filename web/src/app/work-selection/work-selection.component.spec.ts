import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSelectionComponent } from './work-selection.component';

describe('WorkSelectionComponent', () => {
  let component: WorkSelectionComponent;
  let fixture: ComponentFixture<WorkSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
