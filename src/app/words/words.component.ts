import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';

import { DataService } from '../core/data.service';
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

  constructor( private dataService: DataService ) { }
  //constructor( ) { }

  

  ngOnInit(): void {

    //use dummy json - then move to a service (still with dummy json as no implementing actual API)

    //console.log('...')
    this.dataService.getWords().subscribe((words: IWord[]) => {
      this.words = words;
      console.log( 'words' , words)
    });


  }
}
