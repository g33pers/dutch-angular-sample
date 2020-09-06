import { Component } from '@angular/core';

import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lang-demo-app';

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {label: 'Info', icon: 'pi pi-fw pi-chart-bar', routerLink:'about'},
      {label: 'Message', icon: 'pi pi-fw pi-calendar', routerLink:'words'}
  ];
  }
}
