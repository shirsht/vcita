import {Component} from '@angular/core';

/** @title Basic sidenav */
@Component({
  selector: 'app-menu',
  templateUrl: 'Menu.component.html',
  //styleUrls: ['sidenav-overview-example.css'],
})
export class MenuComponent {
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}