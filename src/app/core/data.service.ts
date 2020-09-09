import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError , map } from 'rxjs/operators';

import { IWord } from '../../app/shared/interfaces';

@Injectable()
export class DataService {

    baseUrl: string = 'assets/';
    
    constructor(private http: HttpClient) { }

    getWords() : Observable<IWord[]> {
        return this.http.get<IWord[]>(this.baseUrl + 'words.json')
            .pipe(
                catchError(this.handleError)
            );
    }

    getWord( id: number ) : Observable<IWord> {
        return this.http.get<IWord[]>(this.baseUrl + 'words.json')
            .pipe(
                map( words => {
                    let word = words.filter((word: IWord) => word.id === id);
                    return (word && word.length) ? word[0] : null;
                  }),
                catchError(this.handleError)
            );
    }

    private handleError(error: any) {
      console.error('server error:', error);
      if (error.error instanceof Error) {
          const errMessage = error.error.message;
          return Observable.throw(errMessage);
          // Use the following instead if using lite-server
          // return Observable.throw(err.text() || 'backend server error');
      }
      return Observable.throw(error || 'Node.js server error');
    }

}