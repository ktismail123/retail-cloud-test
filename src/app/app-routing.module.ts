import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'data-table', pathMatch:'full' },
  { path: 'data-table', loadChildren: () => import('./modules/data-table/data-table.module').then(m => m.DataTableModule) },
  { path: 'image-gallery', loadChildren: () => import('./modules/image-gallery/image-gallery.module').then(m => m.ImageGalleryModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
