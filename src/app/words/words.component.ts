import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { Howl } from 'howler';

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
  totalWords: number ;
  toReview: number ;
  wordsLearned: number ;
  wordsInProgress: number ;
  showInfo: boolean = false;

  @ViewChild('dt') table: Table;

  constructor( private dataService: DataService ) { }

  ngOnInit(): void {
    this.dataService.getWords().subscribe((words: IWord[]) => {
      this.words = words;

      const now = new Date().getTime();
      this.toReview = words.filter( (word:IWord) => word.revisionDue && Number(word.revisionDue) < now ).length;
      this.wordsLearned = words.filter( (word:IWord) => word.strength ).length;
      this.wordsInProgress = words.filter( (word:IWord) => word.learning ).length;
      this.totalWords = words.length;

    });
  }

  toggleInfo = ():void => {
    this.showInfo = !this.showInfo;
  }

  playAudio = ( id:number ):void => {
    const sound = new Howl({
      src: ['assets/audio/' + id + '_1587389047125_' + (Math.random() > 0.5 ? 'm' : 'f') + '1.mp3']
    });
    sound.play();
  }
}
