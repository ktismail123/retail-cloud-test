import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ICellRendererParams } from 'ag-grid-enterprise';

/**
 * Component for rendering images in ag-Grid cells.
 */
@Component({
  selector: 'app-image-renderer',
  standalone: true,
  imports: [NgIf],
  template: `
    <span *ngIf="value">
      <img [alt]="value" [src]="value" [height]="39" [width]="50" />
    </span>
  `,
})
export class ImageRenderer {
  /** The value to be rendered as an image. */
  public value!: string;

  /**
   * Initializes the cell renderer with the provided parameters.
   * @param params The parameters provided by ag-Grid for cell rendering.
   */
  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  /**
   * Refreshes the cell renderer with new data.
   * @param params The parameters provided by ag-Grid for cell rendering.
   * @returns Whether the cell needs to be refreshed.
   */
  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    return true;
  }
}
