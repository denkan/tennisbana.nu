import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseShellComponent } from './base-shell.component';

describe('BaseShellComponent', () => {
  let component: BaseShellComponent;
  let fixture: ComponentFixture<BaseShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
