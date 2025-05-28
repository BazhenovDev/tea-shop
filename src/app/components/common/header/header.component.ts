import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showMenu: boolean = false;
  private isMobile: boolean = window.innerWidth <= 991;

  searchInput = new FormControl('');

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= 991;
  }

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.showMenu = false;
  }

  showCollapseMenu() {
    if (this.isMobile) {
      this.showMenu = !this.showMenu;
    }
  }

  searchProducts() {
    if (this.searchInput.value) {
      this.router.navigate([`catalog`], {
        queryParams: {
          search: this.searchInput.value
        }
      });
    } else {
      this.router.navigate([`catalog`])
    }
  }

}
