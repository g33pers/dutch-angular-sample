import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
    imports: [ CommonModule, FormsModule, AboutRoutingModule ],
    declarations: [ AboutComponent ]
})
export class AboutModule { }