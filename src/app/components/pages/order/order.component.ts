import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit, OnDestroy {

  private subscriptionQueryParams: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;
  isProductNameReadonly: boolean = true;

  @ViewChild('modal')
  private modal!: ElementRef;

  @ViewChild('modalText')
  private modalText!: ElementRef;

  @ViewChild('formButton')
  private formButton!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
  ) {
  }

  orderForm = this.fb.group({
    productName: ['', [Validators.required]],
    firstName: ['', [Validators.required, Validators.pattern(/^[А-ЯЁа-яё]{2,}/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[А-ЯЁа-яё]{2,}/)]],
    phone: ['', [Validators.required, Validators.pattern(/^(?:\+7|8)(?:\(?\d{3}\)?)(?:\d{3})(?:-?\d{2}){2}$/)]],
    country: ['', [Validators.required, Validators.pattern(/^[А-ЯЁа-яё]{5,}/)]],
    zip: ['', [Validators.required, Validators.pattern(/[0-9]{6}/)]],
    address: ['', [Validators.required, Validators.pattern(/^([А-ЯЁа-яё]*\s*[0-9]*\\*\-*\/*\.*)*$/)]],
    comment: [''],
  }, {validators: Validators.required});

  get productName() {
    return this.orderForm.get('productName');
  }

  get firstName() {
    return this.orderForm.get('firstName');
  }

  get lastName() {
    return this.orderForm.get('lastName');
  }

  get phone() {
    return this.orderForm.get('phone');
  }

  get country() {
    return this.orderForm.get('country');
  }

  get zip() {
    return this.orderForm.get('zip');
  }

  get address() {
    return this.orderForm.get('address');
  }

  get comment() {
    return this.orderForm.get('comment');
  }

  ngOnInit() {
    this.subscriptionQueryParams = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.orderForm.patchValue({
          productName: params['product']
        })
      }
    });
  }

  sendForm():void {
    if (this.orderForm.valid) {
      this.formButton.nativeElement.setAttribute('disabled', 'disabled');
      this.subscriptionOrder = this.orderService.sendOrder({
        name: this.firstName!.value!,
        last_name: this.lastName!.value!,
        phone: this.phone!.value!,
        country: this.country!.value!,
        zip: this.zip!.value!,
        product: this.productName!.value!,
        address: this.address!.value!,
        comment: this.comment!.value!,
      }).subscribe({
        next: (response) => {
          if (response.success === 1 && !response.message) {
            console.log('заказ успешно оформлен', response);
            this.modalText.nativeElement.textContent = 'Спасибо за заказ!';
            this.showModal()
            this.orderForm.reset();
          } else {
            this.modalText.nativeElement.textContent = response?.message;
            this.showModal()
          }
        },
        error: (error) => {
          this.modalText.nativeElement.textContent = 'Произошла ошибка. Попробуйте еще раз.';
          this.showModal()
          console.log(error);
        }
      })
    }
  }

  showModal(): void {
    this.modal.nativeElement.style.display = 'flex';
    this.formButton.nativeElement.removeAttribute('disabled');
  }

  closeModal() {
    this.modal.nativeElement.style.display = 'none';
  }

  ngOnDestroy(): void {
    this.subscriptionQueryParams?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

}
