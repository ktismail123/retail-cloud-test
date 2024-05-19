import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { IApiRes } from 'src/app/core/models/interfaces/api';
import { GalleryService } from 'src/app/core/service/gallery/gallery.service';

/**
 * Component for displaying an image gallery.
 */
@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent implements OnInit, OnDestroy {
  /** List of images to display in the gallery. */
  imagesList: IApiRes[] = [];

  /** List of subscriptions to handle cleanup. */
  subscription: Subscription[] = [];

  /** Current page number for pagination. */
  page = 1;
  /** Number of images to load per page. */
  limit = 30;

  /** Loading indicator for the gallery. */
  loader = false;

  /** Service for handling gallery operations. */
  private galleryService = inject(GalleryService);

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {
    this.loadImages();
  }

  /**
   * Loads images from the gallery service and updates the images list.
   */
  loadImages(): void {
    this.loader = true;
    this.subscription.push(
      this.galleryService
        .getImages(this.page, this.limit)
        .pipe(
          finalize(() => {
            this.loader = false;
          })
        )
        .subscribe((res) => {
          this.imagesList = res;
        })
    );
  }

  /**
   * Angular lifecycle hook that is called when the directive is destroyed.
   */
  ngOnDestroy(): void {
    this.subscription.forEach((el) => {
      el.unsubscribe();
    });
  }
}
