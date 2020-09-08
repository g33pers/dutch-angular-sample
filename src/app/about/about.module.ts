import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
    imports: [ CommonModule, AboutRoutingModule ],
    declarations: [ AboutComponent ]
})
export class AboutModule { }