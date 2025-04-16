import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordListPage } from './record-list.page';

describe('RecordListPage', () => {
  let component: RecordListPage;
  let fixture: ComponentFixture<RecordListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
