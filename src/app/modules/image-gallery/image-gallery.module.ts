import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { ImageGalleryRoutingModule } from './image-gallery-routing.module';
import { HomeComponent } from '../home/home/home.component';
import { TabsComponent } from 'src/app/shared/widgets/tabs/tabs.component';

@NgModule({
  declarations: [ImageGalleryComponent],
  imports: [CommonModule, ImageGalleryRoutingModule, NgOptimizedImage, TabsComponent],
})
export class ImageGalleryModule {}
