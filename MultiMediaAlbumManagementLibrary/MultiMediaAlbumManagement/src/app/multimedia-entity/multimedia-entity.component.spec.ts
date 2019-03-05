import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultimediaEntityComponent } from './multimedia-entity.component';

describe('MultimediaEntityComponent', () => {
  let component: MultimediaEntityComponent;
  let fixture: ComponentFixture<MultimediaEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultimediaEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultimediaEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
