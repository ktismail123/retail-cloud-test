import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch:'full' },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'data-table', loadChildren: () => import('./modules/data-table/data-table.module').then(m => m.DataTableModule) },
  { path: 'image-gallery', loadChildren: () => import('./modules/image-gallery/image-gallery.module').then(m => m.ImageGalleryModule) },
  { path: '**', loadChildren: () => import('./modules/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
