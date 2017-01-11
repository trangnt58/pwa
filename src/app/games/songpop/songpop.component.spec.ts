/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SongpopComponent } from './songpop.component';

describe('SongpopComponent', () => {
  let component: SongpopComponent;
  let fixture: ComponentFixture<SongpopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongpopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongpopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
