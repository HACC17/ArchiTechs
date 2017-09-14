import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DumplogComponent } from './dumplog.component';

describe('DumplogComponent', () => {
  let component: DumplogComponent;
  let fixture: ComponentFixture<DumplogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DumplogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumplogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
