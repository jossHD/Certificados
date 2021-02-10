import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [],
  imports: [CommonModule,MatSidenavModule,MatToolbarModule,MatIconModule,MatButtonModule,MatProgressSpinnerModule],
  exports:[MatSidenavModule,MatToolbarModule,MatIconModule,MatButtonModule,MatProgressSpinnerModule]
})
export class MaterialModule { }
