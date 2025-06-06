import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SliderType} from "../../../../types/slider.type";
import {SliderService} from "../../../shared/services/slider.service";

@Component({
  selector: 'slider-component',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {

  @Input() sliders: SliderType[];

  currentSlideIndex: number = 0;
  private interval: number = 0;

  currentSlide: SliderType = {
    image: '',
    title: '',
    description: '',
    textButton: ''
  }

  constructor(private sliderService: SliderService) {
    this.sliders = [{
      image: '',
      title: '',
      description: '',
      textButton: ''
    }]
  }

  ngOnInit(): void {
    this.sliders = this.sliderService.getSliderInfo();
    this.currentSlide = this.sliders[this.currentSlideIndex];
    this.resetInterval();
  }

  goToNextSlide() {
    this.currentSlideIndex += 1;
    if (this.currentSlideIndex >= this.sliders.length) {
      this.currentSlideIndex = 0;
    }
    this.resetInterval();
    this.showSlide();
  }

  goToPrevSlide() {
    if (this.currentSlideIndex <= 0) {
      this.currentSlideIndex = this.sliders.length;
    }
    this.currentSlideIndex -= 1;
    this.resetInterval();
    this.showSlide();
  }

  showSlide() {
    this.currentSlide = this.sliders[this.currentSlideIndex];
  }

  resetInterval() {
    if (this.interval) {
        window.clearInterval(this.interval);
    }
    this.interval = window.setInterval(() => {
      this.goToNextSlide();
    }, 5000)
  }

  ngOnDestroy(): void {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

}
