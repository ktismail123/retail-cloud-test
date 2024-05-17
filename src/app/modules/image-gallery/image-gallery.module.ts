import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { ImageGalleryRoutingModule } from './image-gallery-routing.module';

@NgModule({
  declarations: [ImageGalleryComponent],
  imports: [CommonModule, ImageGalleryRoutingModule],
})
export class ImageGalleryModule {}
