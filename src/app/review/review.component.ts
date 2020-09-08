import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /*
    take a phrase from the words data (subscribe with data service)

    split phrase into individual words

    have var for show word

    show word and translation with button to play audio (auto play on load)

    click start button to hide answer and present individual words asclickable buttons - click to add or remove from answer
  */

}

/*
import React, {useState, useEffect} from "react"

import {PlayAudio} from "../../widgets/PlayAudio.js"

const CombineElements = ( props ) => {

    //teach or learn etc
    const {data , options} = props
    const [ disabled , setDisabled ] = useState( false )
    const [ showPhase , setShowPhase ] = useState( false )
    const [sourceArray , setSourceArray ] = useState([])
    const [answersArray , setAnswersArray ] = useState([])
    const [answersProcessedArray , setAnswersProcessedArray ] = useState([])
    const [optionsArray , setOptionsArray ] = useState([])
    const [clickCount, setClickCount] = useState( 0 )
    const [hintsEnabled, setHintsEnabled] = useState(true)
    const [allHintsEnabled, setAllHintsEnabled] = useState(true)
    const [lockedUntil , setLockedUntil] = useState( -1 )

    console.log( 'props' , props)

    console.log( data );

    useEffect( () => {
      setDisabled( () => false )

      //if there are more than one spaces then break into words and get user to click each part to order,
      //if not break into letters (include space bar as option?)
      //add red herring letters / words to add

      const lengthCheck = data.translation.split(' ').length
      console.log( 'lengthCheck' , lengthCheck )

      let srcArray

      if( lengthCheck > 2 ){
        srcArray = data.translation.split(' ')
      } else {
        srcArray = data.translation.split('')
      }

      console.log( srcArray )

      let newArray = []

      //let srcArray = [...sourceArray]

      while( srcArray.length > 0 ){

        const ref = srcArray.splice( Math.floor(Math.random() * srcArray.length ) , 1 )


        newArray.push( ref )

      }

      setSourceArray( () => newArray )

      //if look cover write, show correct solution and button to hide, else skip step
      if( options.showAnswer ){
        setShowPhase( () => {
          return true
        })

        //PlayAudio.play( data.translation )
        //playSound( {} )
      }



      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

    useEffect( () => {

      console.log( 'answersArray' , answersArray )
      setOptionsArray( () => {

        //new array with index value in original array stored
        let newArray = sourceArray.map( (item, index) => {
          return {label: item, index: index}
        })

        //get all unused options
        newArray = newArray.filter((item, index) => {
          return !answersArray.some( (elem) => elem === index)
        })

        newArray = newArray.map((item) => {
          return <button key={item.index} onClick={ () => { addOption( item.index )}}>{item.label}</button>
        })

        return newArray
      })

      setAnswersProcessedArray( () => {

        let newArray = [...answersArray]

        newArray = newArray.filter( (element, index) => sourceArray.some( (elem, index) => element === index) )

        newArray = newArray.map( (item, index) => {
          console.log( 'index < lockedUntil - 1' , (index <= lockedUntil - 1) , index , lockedUntil)
          if( index <= lockedUntil - 1 ){
            return <button key={item} className="locked">{sourceArray[item]}</button>
          }
          return <button key={item} onClick={ () => { removeOption( item )}}>{sourceArray[item]}</button>
        })

        return newArray
      })

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ sourceArray , answersArray ])

    useEffect( () => {
      const lengthCheck = data.translation.split(' ').length
      console.log( 'lengthCheck' , lengthCheck )

      let myAnswer = answersArray.map( (element) => {
        return sourceArray[ element ]
      })

      if( lengthCheck > 2 ){
        myAnswer = myAnswer.join(' ')
      } else {
        myAnswer = myAnswer.join('')
      }

      let correct = ( myAnswer.toLowerCase() === data.translation.toLowerCase() )

      console.log( 'evaluate if correct:' , answersArray , correct , myAnswer , data.translation.toLowerCase())

      if( correct ){
        setDisabled( () => true )

        //PlayAudio.play( data.translation )

        let response

        if( clickCount === answersArray.length ){
          response = 5
        } else if ( clickCount <= answersArray.length + 4){
          response = 4
        } else if ( clickCount <= answersArray.length * 3){
          response = 3
        } else {
          response = 2//evaluate as if wrong for review period
        }



        playSound( response )

      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [answersProcessedArray] )

    const addOption = ( ref ) => {

      if( disabled ){
        return false
      }

      setHintsEnabled( () => true )

      setClickCount( (prevValue) => prevValue + 1)

      setAnswersArray(( previousArray ) => {
        let retArray = [...previousArray]
        retArray.push( ref )

        return retArray
      })
    }

    const removeOption = ( ref ) => {

      if( disabled ){
        return
      }

      setHintsEnabled( () => true )

      setClickCount( (prevValue) => prevValue + 1)

      setAnswersArray(( previousArray ) => {

        let retArray = previousArray.filter( (item) => item !== ref )

        return retArray
      })
    }

    const needsHint = () => {
      //remove all answers after last correct answer and add one more correct option
      //need to allow for duplicates of a letter / word
      //including updating unclicked options

      //lock everything hinted so far so can't go to pre-hint state - TO DO
      //half solution implemented - adding or removing options enables hints, using hints disables until user interacts somehow unless max hints reached
      //(caveat being that after max hints reached, removing "correct" option doen't resote hints) - once hint locking in place, not an issue
      setHintsEnabled( () => false )

      if( disabled ){
        return false
      }

      setClickCount( (prevValue) => prevValue + 2.5)

      const lengthCheck = data.translation.split(' ').length
      console.log( 'lengthCheck' , lengthCheck )

      let srcArray

      if( lengthCheck > 2 ){
        srcArray = data.translation.split(' ')
      } else {
        srcArray = data.translation.split('')
      }

      let lastGood = 0
      for( let i = 0 ; i < answersArray.length ; i ++ ){
        if( sourceArray[ answersArray[i] ][0].toLowerCase() !== srcArray[i].toLowerCase() ){
          break
        } else {
          lastGood = i + 1
        }
      }

      setLockedUntil( () => lastGood )

      console.log( lastGood , 'elements correctly chosen')

      setAnswersArray( (prevArray) => {
        let retArray = prevArray.slice( 0 , lastGood )

        //if only two clicks away( as when only 1, there is only one option oleft to click!), don't add final piece
        if( retArray.length > srcArray.length - 3 ){
          setAllHintsEnabled( () => false )
          return retArray
        }

        for( let n = 0 ; n < sourceArray.length ; n ++ ){
          let inArray = false
          for( let i = 0 ; i < retArray.length ; i ++ ){
              if( retArray[i] === n ){
                inArray = true
                break
              }
          }

          if( !inArray ){
            if( srcArray[ lastGood ].toLowerCase() === sourceArray[n][0].toLowerCase() ){
              //if this is a match for the next element, add it, and break
              retArray.push(n)
              break
            }
          }
        }

        setLockedUntil( () => retArray.length )

        return retArray
      })

    }

    const playSound = async ( response ) => {
      const result = await PlayAudio.play( data.id )

      setTimeout( () => {
        return props.testWord( response )
      } , 1000)
    }

    return (
      <div>
      {sourceArray.length}
        {options.showAnswer ? 'look / cover / write' : 'translate / write'}
        <p><strong>CombineElements:</strong> {data.word}</p>
        {options.showAnswer && showPhase ? (
          <div>
            <div>{data.translation}</div>
            <p><a href="#" onClick={ () => { PlayAudio.play( data.id )}} >play word</a></p>
            <button onClick={ () => { setShowPhase( () => false)}}>hide</button>
          </div>
        ) : (
          <div>
            {answersArray}<br/>
            {answersProcessedArray}
            <p>this is where the rearranging activity bits and bobs goes</p>
            {optionsArray}
            <hr/>
            {hintsEnabled && allHintsEnabled && <button onClick={needsHint}>get hint</button> }
            {options.showAnswer && <p><a href="#" onClick={ () => { PlayAudio.play( data.translation )}} >play audio</a></p>}
          </div>
        )}

      </div>
    )
}

export default CombineElements
*/