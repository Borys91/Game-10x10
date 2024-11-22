import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ResultModalComponent } from './result-modal.component';

describe('ResultModalComponent', () => {
  let component: ResultModalComponent;
  let fixture: ComponentFixture<ResultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultModalComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: '' }]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
