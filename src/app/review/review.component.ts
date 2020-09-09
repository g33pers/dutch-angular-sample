import { Component, OnInit } from '@angular/core';

import { Howl } from 'howler';
import {MessageService} from 'primeng/api';

import { DataService } from '../core/data.service';
import { IWord } from '../shared/interfaces';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  providers: [MessageService]
})
export class ReviewComponent implements OnInit {

  sourceArray: string[]
  optionsArray: any[]
  answersArray: number[] = []
  disabled: boolean = false;
  word: IWord;
  demoWords: number[] = [11, 5];
  currentWord: number = 0;
  showing:boolean = true;

  constructor( private dataService: DataService, private messageService: MessageService ) { }

  ngOnInit(): void {
    this.generateQuestion( this.demoWords[ this.currentWord ])
  }

  generateQuestion = ( chosenWord:number ):void => {
    this.dataService.getWord(chosenWord).subscribe((word: IWord) => {

      this.word = word;
      
      //if there are more than one spaces then break into words and get user to click each part to order,
      //if not break into letters (include space bar as option) - **not in demo**
      const lengthCheck = word.translation.split(' ').length

      let srcArray: string[]

      if( lengthCheck > 2 ){
        srcArray = word.translation.split(' ')
      } else {
        srcArray = word.translation.split('')
      }

      //shuffle word order
      let newArray = []

      while( srcArray.length > 0 ){
        const ref = srcArray.splice( Math.floor(Math.random() * srcArray.length ) , 1 )
        newArray.push( ref )
      }

      this.sourceArray = newArray;
      this.answersArray = [];
      this.showing = true;

      this.updateAnswer();

      this.disabled = false;

    });
  }

  hideTranslation = ():void => {
    this.showing = false;
  }

  updateAnswer = ():void => {
    //loop through currently set user answer and create buttons for unused words

    //new array with index value in original array stored
    let newArray = this.sourceArray.map( (item, index) => {
      return {label: item, index: index}
    })

    //get all unused options
    newArray = newArray.filter((item, index) => {
      return !this.answersArray.some( (elem) => elem === index)
    })

    this.optionsArray = newArray;

    this.checkAnswer();
  }

  checkAnswer = ():void => {

    const lengthCheck = this.word.translation.split(' ').length

    const myAnswer = this.answersArray.map( (element:number) => {
      return this.sourceArray[ element ]
    })

    let myAnswerString:string

    //if there are more than one spaces then break into words and get user to click each part to order,
    //if not break into letters (include space bar as option) - **not in demo**
    if( lengthCheck > 2 ){
      myAnswerString = myAnswer.join(' ')
    } else {
      myAnswerString = myAnswer.join('')
    }

    const correct = ( myAnswerString.toLowerCase() === this.word.translation.toLowerCase() );

    if( correct ){
      //disabled state adds a reset button with icon
      this.disabled = true;

      //play audio
      this.playAudio()

      //toast
      this.messageService.add({severity:'success', summary:'Well done!', detail: '"' + this.word.translation + '" is correct'});

      this.currentWord = ( this.currentWord === 0 ? 1 : 0 );
    }
  }

  addOption = ( ref:number ) => {

    console.log( ref )

    if( this.disabled ){
      return false
    }

    this.answersArray.push( ref )

    this.updateAnswer()

  }

  removeOption = ( ref:number ) => {

    if( this.disabled ){
      return
    }

    this.answersArray = this.answersArray.filter( (item) => item !== ref )

    this.updateAnswer()

  }

  playAudio = ( ):void => {

    const id = this.word.id;

    const sound = new Howl({
      src: ['assets/audio/' + id + '_1587389047125_' + (Math.random() > 0.5 ? 'm' : 'f') + '1.mp3']
    });
    sound.play();
  }

  /*
    take a phrase from the words data (subscribe with data service)

    split phrase into individual words

    have var for show word

    show word and translation with button to play audio

    click start button to hide answer and present individual words asclickable buttons - click to add or remove from answer
  */

}