/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LearningComponent } from './learning.component';

describe('LearningComponent', () => {
  let component: LearningComponent;
  let fixture: ComponentFixture<LearningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
