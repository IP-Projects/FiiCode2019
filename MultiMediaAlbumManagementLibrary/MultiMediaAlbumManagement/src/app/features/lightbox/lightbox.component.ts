import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: "app-lightbox",
  templateUrl: "./lightbox.component.html",
  styleUrls: ["./lightbox.component.scss"]
})
export class LightboxComponent implements OnInit, AfterViewInit, OnChanges {
  @Input()
  data;

  @Input()
  type;

  @Input()
  index;

  @Input()
  show;

  @Input()
  noMoreData;

  @Input()
  entityUrl;

  @Output()
  noShow = new EventEmitter();

  @Output()
  loadMore = new EventEmitter();

  ready = 0;
  slideIndex;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.ready = 1;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.show == 1) {
      this.slideIndex = this.index;
      this.openEntityModal();
      this.currentSlide(this.slideIndex + 1);
    }
  }

  openEntityModal() {
    document.getElementById(`${this.type}Modal`).style.display = "block";
  }
  closeEntityModal() {
    document.getElementById(`${this.type}Modal`).style.display = "none";
    this.noShow.emit(0);
  }
  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  currentSlide(n) {
    this.showSlides((this.slideIndex = n));
  }

  showSlides(n) {
    var i;
    var slides = document.getElementsByClassName(`my${this.type}Slides`);
    console.log(slides);
    if (n > slides.length) {
      if (this.noMoreData) {
        this.slideIndex = 1;
      } else {
        this.loadMore.emit(true);
        this.slideIndex = this.slideIndex - 1;
      }
    }
    console.log(slides);

    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i]["style"].display = "none";
    }

    slides[this.slideIndex - 1]["style"].display = "block";
  }
}
