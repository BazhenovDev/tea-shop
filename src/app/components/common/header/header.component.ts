import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showMenu: boolean = false;
  private isMobile: boolean = window.innerWidth <= 991;

  // searchInput: FormControl<string | null> = new FormControl('');
  searchInput: FormControl = new FormControl<string>('', { nonNullable: true });

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= 991;
  }

  constructor(private router: Router,
              private searchService: SearchService) {

  }

  ngOnInit(): void {
    this.showMenu = false;
  }

  showCollapseMenu() {
    if (this.isMobile) {
      this.showMenu = !this.showMenu;
    }
  }

  // Код через productService
  // searchProducts() {
  //   if (this.searchInput.value) {
  //     this.router.navigate([`catalog`], {
  //       queryParams: {
  //         search: this.searchInput.value
  //       }
  //     });
  //   } else if (this.searchInput.value === null || this.searchInput.value === '') {
  //     this.router.navigate([`catalog`])
  //   }
  // }
  // clearSearchParam() {
  //   this.searchInput.setValue('');
  //   this.router.navigate([`catalog`]);
  // }


  // Код через Subject
  searchProducts() {
    const searchValue: string = this.searchInput.value;
    if (searchValue) {
      this.router.navigate([`catalog`], {queryParams: {search: searchValue}});
      this.searchService.updateSearch(searchValue);
    } else if (!searchValue) {
      this.router.navigate([`catalog`])
      this.searchService.updateSearch('');
    }
  }
  clearSearchParam() {
    this.searchInput.setValue('');
    this.router.navigate([`catalog`]);
    this.searchService.updateSearch('');
  }

}
