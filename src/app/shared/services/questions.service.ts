import {Injectable} from '@angular/core';
import {QuestionsType} from "../../../types/questions.type";

@Injectable()
export class QuestionsService {

  constructor() {
  }

  getQuestions(): QuestionsType[] {
    return [
      {
        title: 'Собираете ли вы подарочные боксы?',
        description: 'Да, конечно! Мы с удовольствием собираем подарочные боксы — как из готовых вариантов, так и по индивидуальному запросу. Вы можете выбрать чай, упаковку и дополнительные подарки, а мы всё красиво оформим. Идеально подойдёт для любого повода!',
      },
      {
        title: 'Сколько у вас разновидностей чая?',
        description: 'У нас широкий ассортимент — более 50 видов чая из разных уголков мира. В наличии классические чёрные, зелёные и белые чаи, а также травяные сборы, пуэры, улуны и ароматизированные смеси. Мы постоянно пополняем коллекцию, чтобы удивлять вас новыми вкусами!',
      },
      {
        title: 'В какой срок осуществляется доставка?',
        description: 'Срок доставки зависит от вашего города и выбранного способа. Обычно по Москве и Московской области доставка занимает от 1 до 5 рабочих дней. Мы стараемся отправлять заказы как можно быстрее — чаще всего в день оформления или на следующий день.',
      },
      {
        title: 'У вас обновляется ассортимент?',
        description: 'Да, мы регулярно обновляем ассортимент! Добавляем как сезонные чаи, так и эксклюзивные новинки. Следим за трендами и стараемся радовать вас интересными вкусами и редкими сортами.',
      },
      {
        title: 'Какого объема у вас пачки чая?',
        description: 'У нас есть разные варианты фасовки — от пробников по 25 грамм до полноразмерных пачек по 100 и 200 грамм. Точный объём зависит от конкретного чая и его плотности. Если вам нужен совет по выбору — с радостью подскажем!',
      }
    ]
  }

}
