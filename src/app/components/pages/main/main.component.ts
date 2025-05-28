import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {QuestionsService} from "../../../services/questions.service";
import {QuestionsType} from "../../../types/questions.type";
import {SliderService} from "../../../services/slider.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [QuestionsService, SliderService]
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modal')
  private modal!: ElementRef;
  private observable: Observable<string>;
  private subscription: Subscription | null = null;

  questions: QuestionsType[]
  showLoader: boolean = false;

  constructor(private render: Renderer2, private questionsService: QuestionsService) {
    this.observable = new Observable(observer => {
      const timeout = setTimeout(() => {
        observer.next('flex');
      }, 10000)
      return {
        unsubscribe() {
          clearTimeout(timeout)
        }
      }
    });

    this.questions = [{
      title: '',
      description: '',
    }];
  }

  ngOnInit(): void {
    this.showLoader = true;
    setTimeout(() => {
      this.questions = this.questionsService.getQuestions();
      this.showLoader = false;
    }, 300)
  }

  ngAfterViewInit() {
    this.subscription = this.observable.subscribe({
      next: (display: string) => {
        this.render.setStyle(this.modal.nativeElement, 'display', display);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  closeModal() {
    this.render.setStyle(this.modal.nativeElement, 'display', 'none');
  }


  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
