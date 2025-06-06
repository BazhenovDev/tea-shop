import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {OrderService} from "../../shared/services/order.service";

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
    private router: Router,
  ) {
  }

  orderForm = this.fb.group({
    productName: ['', [Validators.required]],
    firstName: ['', [Validators.required, Validators.pattern(/^[А-ЯЁа-яё]{2,}/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[А-ЯЁа-яё]{2,}/)]],
    phone: ['', [Validators.required, Validators.pattern(/^(?:\+*\d{1})(?:\(?\d{3}\)?)(?:\d{3})(?:-?\d{2}){2}$/)]],
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

  redirectToCatalog: boolean = false;

  sendForm():void {
    if (this.orderForm.valid) {
      this.formButton.nativeElement.setAttribute('disabled', 'disabled');
      const formValue = this.orderForm.value;
      this.subscriptionOrder = this.orderService.sendOrder({
        name: formValue.firstName || '',
        last_name: formValue.lastName || '',
        phone: formValue.phone || '',
        country: formValue.country || '',
        zip: formValue.zip || '',
        product: formValue.productName || '',
        address: formValue.address || '',
        comment: formValue.comment || '',
      }).subscribe({
        next: (response) => {
          if (response.success === 1 && !response.message) {
            console.log('заказ успешно оформлен', response);
            this.modalText.nativeElement.textContent = 'Спасибо за заказ!';
            this.redirectToCatalog = true;
            this.showModal()
            this.orderForm.reset();
          } else {
            this.modalText.nativeElement.textContent = response?.message;
            this.redirectToCatalog = false;
            this.showModal();
          }
        },
        error: (error) => {
          this.redirectToCatalog = false;
          this.modalText.nativeElement.textContent = 'Произошла ошибка. Попробуйте еще раз.';
          this.showModal()
          console.log(error);
        }
      })
    } else {
      this.firstName?.markAsDirty()
      this.lastName?.markAsDirty()
      this.phone?.markAsDirty()
      this.country?.markAsDirty()
      this.zip?.markAsDirty()
      this.address?.markAsDirty()
    }
  }

  showModal(): void {
    this.modal.nativeElement.style.display = 'flex';
    this.formButton.nativeElement.removeAttribute('disabled');
  }

  closeModal(): void {
    this.modal.nativeElement.style.display = 'none';
    if (this.redirectToCatalog) {
      this.router.navigate(['catalog']);
    }
  }

  banLetter(event: KeyboardEvent): void {
    if (event.key && event.key.match(/^[a-zA-ZА-Яёа-яё]$/g)) {
      event.preventDefault();
    }
  }

  ngOnDestroy(): void {
    this.subscriptionQueryParams?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

}
