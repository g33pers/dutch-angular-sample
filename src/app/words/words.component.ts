import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';

import { IWord } from '../shared/interfaces';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {

  words: IWord[] = [];
  cols: any[];

  @ViewChild('dt') table: Table;

  constructor() { }

  ngOnInit(): void {

    //use dummy json - then move to a service (still with dummy json as no implementing actual API)
    this.words = [
      { word: "Bonjour", translation: "Hello" , id: 0, learned: true, strength: 10, lastPracticed: new Date(), revisionDue: new Date() },
      { word: "Bonjour2", translation: "Hello2" , id: 0, learned: true, strength: 10, lastPracticed: new Date(), revisionDue: new Date() },
      { word: "Bonjour3", translation: "Hello3" , id: 0, learned: true, strength: 10, lastPracticed: new Date(), revisionDue: new Date() },
      { word: "Bonjour4", translation: "Hello4" , id: 0, learned: true, strength: 10, lastPracticed: new Date(), revisionDue: new Date() },
      { word: "Bonjour", translation: "Hello" , id: 0, learned: true, strength: 10, lastPracticed: new Date(), revisionDue: new Date() },
      { word: "Bonjour2", translation: "Hello2" , id: 0, learned: true, strength: 10, lastPracticed: new Date(), revisionDue: new Date() },
      { word: "Bonjour3", translation: "Hello3" , id: 0, learned: true, strength: 10, lastPracticed: new Date(), revisionDue: new Date() },
      { word: "Bonjour4", translation: "Hello4" , id: 0, learned: true, strength: 10, lastPracticed: new Date(), revisionDue: new Date() },
      { word: "Bonjour", translation: "Hello" , id: 0, learned: true, strength: 10, lastPracticed: new Date(), revisionDue: new Date() },
      { word: "Bonjour2", translation: "Hello2" , id: 0, learned: true, strength: 10, lastPracticed: new Date(), revisionDue: new Date() },
      { word: "Bonjour3", translation: "Hello3" , id: 0, learned: true, strength: 10, lastPracticed: new Date(), revisionDue: new Date() },
      { word: "Bonjour4", translation: "Hello4" , id: 0, learned: true, strength: 10, lastPracticed: new Date(), revisionDue: new Date() },
      { word: "Bonjour", translation: "Hello" , id: 0, learned: true, strength: 10, lastPracticed: new Date(), revisionDue: new Date() },
      { word: "Bonjour2", translation: "Hello2" , id: 0, learned: true, strength: 10, lastPracticed: new Date(), revisionDue: new Date() },
      { word: "Bonjour3", translation: "Hello3" , id: 0, learned: true, strength: 10, lastPracticed: new Date(), revisionDue: new Date() },
      { word: "Bonjour4", translation: "Hello4" , id: 0, learned: true, strength: 10, lastPracticed: new Date(), revisionDue: new Date() }
    ]

  }
}
