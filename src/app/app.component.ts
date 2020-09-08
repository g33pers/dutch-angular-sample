import { Component } from '@angular/core';

import {MenuItem} from 'primeng/api';
import { DataService } from './core/data.service';
import { IWord } from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lang-demo-app';
  
  items: MenuItem[];
  toReview: number = 0;
  
  constructor( private dataService: DataService ) { }

  ngOnInit() {
    this.updateItems();

    this.dataService.getWords().subscribe((words: IWord[]) => {
      const now = new Date().getTime();
      this.toReview = words.filter( (word:IWord) => word.revisionDue && Number(word.revisionDue) < now ).length;

      this.updateItems();
    });
  }

  updateItems = ():void => {

    console.log( this.toReview )
    this.items = [
      {label: 'About', icon: 'pi pi-fw pi-home', routerLink:'about'},
      {label: 'Words', icon: 'pi pi-fw pi-list', routerLink:'words'},
      {label: 'Review', icon: `pi pi-fw pi-chart-line ${(this.toReview > 0 && 'add-badge-' + this.toReview + ' badge-class-info')}`, routerLink:'review'}
    ];

    //hack as PrimeNG doesn't support badges on menu items (and the badge content is updated after ngAfterViewInit )
    setTimeout( () => {
      this.addBadges()
    },100)
  }

  addBadges = ():void => {
    let els = document.querySelectorAll('[class*=add-badge-]')
    for(let el of Array.from(els)){
        let matches = el.className.match(/add-badge-(\S+)/)
        let badgeVal = matches ? matches[1] : ''
        let badgeText = badgeVal.replace(/\\\-/g,'__dash__').replace(/\-/g,' ').replace('__dash__','-')
        let badgeTextNode = document.createTextNode(badgeText)
        matches = el.className.match(/badge-class-(\S+)/)
        let badgeClass = matches ? matches[1] : 'danger'
        let badge = document.createElement('span')
        badge.classList.add('badge')
        badgeClass && badgeClass !== 'none' ? badge.classList.add('badge-'+badgeClass) : null
        badge.appendChild(badgeTextNode)
        el.appendChild(badge)
        el.classList.remove('add-badge-'+badgeVal, 'badge-class-'+badgeClass)
    }
  }
}
