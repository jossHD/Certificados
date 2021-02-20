import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';


const myModule =[
  MatSidenavModule,MatToolbarModule,
  MatIconModule,MatButtonModule,
  MatProgressSpinnerModule,
  MatCardModule,MatInputModule,
  MatTableModule,MatPaginatorModule,
  MatSortModule,MatDialogModule
]
@NgModule({
  declarations: [],
  imports: [CommonModule,myModule],
  exports:[myModule]
})
export class MaterialModule { }
