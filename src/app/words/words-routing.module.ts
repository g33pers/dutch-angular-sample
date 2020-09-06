import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordsComponent } from './words.component'

const routes: Routes = [
  { path: 'words', component: WordsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordsRoutingModule { }
