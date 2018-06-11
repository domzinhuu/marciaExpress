import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportResumeComponent } from './export-resume.component';

describe('ExportResumeComponent', () => {
  let component: ExportResumeComponent;
  let fixture: ComponentFixture<ExportResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
