import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';

import { ReviewComponent } from './review.component';

import { ReviewRoutingModule } from './review-routing.module';

@NgModule({
  declarations: [ReviewComponent ],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    ToastModule,
    BrowserAnimationsModule,
    ButtonModule
  ]
})
export class ReviewModule { }
