import { Injectable } from '@angular/core';
import {SliderType} from "../../../types/slider.type";

@Injectable()
export class SliderService {

  constructor() { }

  getSliderInfo(): SliderType[] {
    return [
      {
        image: '1.png',
        title: 'Скидки на травяные чаи',
        description: 'Узнай все подробности, выбрав чай и заполнив заявку',
        textButton: 'Каталог'
      },
      {
        image: '2.png',
        title: 'Закажи три пачки чая и получи подарок',
        textButton: 'Каталог'
      },
      {
        image: '3.png',
        title: 'Попробуй нашу новинку — ягодный чай',
        textButton: 'Каталог'
      },
    ]
  }

}
