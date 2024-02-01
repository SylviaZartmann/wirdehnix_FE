import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePWComponent } from './change-pw.component';

describe('ChangePWComponent', () => {
  let component: ChangePWComponent;
  let fixture: ComponentFixture<ChangePWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePWComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangePWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
