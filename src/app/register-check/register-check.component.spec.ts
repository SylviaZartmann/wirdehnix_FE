import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCheckComponent } from './register-check.component';

describe('RegisterCheckComponent', () => {
  let component: RegisterCheckComponent;
  let fixture: ComponentFixture<RegisterCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
