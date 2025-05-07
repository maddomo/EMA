import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModulePickerPage } from './module-picker.page';

describe('ModulePickerPage', () => {
  let component: ModulePickerPage;
  let fixture: ComponentFixture<ModulePickerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulePickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
