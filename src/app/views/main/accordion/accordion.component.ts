import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {QuestionsType} from "../../../../types/questions.type";

@Component({
  selector: 'accordion-component',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  @Input() question: QuestionsType;

  showQuestion: boolean = false;
  @ViewChild('accordionButton')
  private accordionButton!: ElementRef;

  constructor(private renderer: Renderer2) {
    this.question = {
        title: '',
        description: '',
      }
  }

  ngOnInit(): void {
  }

  clickOnAccordionButton(): void {
    this.showQuestion = !this.showQuestion;
    let rotate: string = this.showQuestion  ? '-180' : '0';
    this.renderer.setStyle(this.accordionButton.nativeElement, 'transform', `rotate(${rotate}deg)`);
  }

}
