import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultimediaAlbumComponent } from './multimedia-album.component';

describe('MultimediaAlbumComponent', () => {
  let component: MultimediaAlbumComponent;
  let fixture: ComponentFixture<MultimediaAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultimediaAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultimediaAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
