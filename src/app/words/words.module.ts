import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';

import { WordsRoutingModule } from './words-routing.module';
import { WordsComponent } from './words.component';


@NgModule({
  declarations: [WordsComponent],
  imports: [
    CommonModule,
    WordsRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule
  ]
})
export class WordsModule { }
