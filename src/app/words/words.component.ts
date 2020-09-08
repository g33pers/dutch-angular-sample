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

  @ViewChild('dt') table: Table;

  constructor( private dataService: DataService ) { }
  //constructor( ) { }

  showInfo: boolean = false;
 

  ngOnInit(): void {

    //use dummy json - then move to a service (still with dummy json as no implementing actual API)

    //console.log('...')
    this.dataService.getWords().subscribe((words: IWord[]) => {
      this.words = words;
      console.log( 'words' , words)
    });


  }

  toggleInfo = ():void => {
    this.showInfo = !this.showInfo;

    console.log( "..." , this.showInfo )
  }

  playAudio = ( id ):void => {
    const sound = new Howl({
      src: ['assets/audio/' + id + '_1587389047125_' + (Math.random() > 0.5 ? 'm' : 'f') + '1.mp3']
    });
    
    sound.play();
  }
}
