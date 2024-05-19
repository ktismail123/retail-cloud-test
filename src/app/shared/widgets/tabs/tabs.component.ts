import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

type ITab = 'data-table' | 'image-gallery';

/**
 * Component for handling tab navigation between the data table and image gallery.
 */
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
})
export class TabsComponent {
  /** Injected instance of the Angular Router. */
  private router = inject(Router);

  /** The currently selected tab. */
  selectedTab: ITab = 'data-table';

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Sets the selected tab based on the current router URL.
   */
  ngOnInit(): void {
    this.selectedTab =
      this.router.url.replace('/', '') === 'data-table'
        ? 'data-table'
        : 'image-gallery';
  }

  /**
   * Selects a tab and navigates to the corresponding route.
   * @param tab The tab to select.
   */
  tabSelect(tab: ITab): void {
    this.selectedTab = tab;
    this.router.navigateByUrl(tab);
  }
}
