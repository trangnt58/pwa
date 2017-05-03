import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningOfflineComponent } from './warning-offline.component';

describe('WarningOfflineComponent', () => {
  let component: WarningOfflineComponent;
  let fixture: ComponentFixture<WarningOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
