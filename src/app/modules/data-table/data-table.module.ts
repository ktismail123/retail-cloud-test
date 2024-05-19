import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTableRoutingModule } from './data-table-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ImageRenderer } from './data-table/dt-image-renderer.component';
import { TabsComponent } from 'src/app/shared/widgets/tabs/tabs.component';

@NgModule({
  declarations: [
    DataTableComponent
  ],
  imports: [
    CommonModule,
    DataTableRoutingModule,
    AgGridModule,
    FormsModule,
    ImageRenderer,
    TabsComponent
  ]
})
export class DataTableModule { }
