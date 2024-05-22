import { Component, inject } from '@angular/core';
import {
  GridApi,
  GridOptions,
  GridReadyEvent,
  SideBarDef,
} from 'ag-grid-enterprise';
import { finalize, Subscription } from 'rxjs';
import { DataTableService } from 'src/app/core/service/data-table/data-table.service';
import { ImageRenderer } from '../data-table/dt-image-renderer.component';
import 'ag-grid-enterprise';

/**
 * Component for displaying a data table using ag-Grid.
 */
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  /** Subscriptions to handle observable streams. */
  subscription: Subscription[] = [];

  /** Grid parameters. */
  params?: GridReadyEvent;

  /** Current page number. */
  currentPage: number = 1;

  /** Number of rows per page. */
  paginationPageSize: number = 30;

  /** Total number of data items. */
  totalDataCount: number = 100; // Assume total data count is 100

  /** Total number of pages. */
  totalPages = 0;

  /** Index of the first item on the current page. */
  startItemIndex: number = 0;

  /** Index of the last item on the current page. */
  endItemIndex: number = 0;

  /** Loading state indicator. */
  loading: boolean = false;

  /** Total count of items in the data table. */
  totalCount: number = 100;

  /** Options for pagination size. */
  options: number[] = [10, 20, 30];

  /** Limit of items per page. */
  limit: number = 30;

  /** Injected DataTableService. */
  private dataTableService = inject(DataTableService);

  /** Sidebar configuration for ag-Grid. */
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      },
    ],
    defaultToolPanel: 'columns',
  };

  /** Grid API. */
  gridApi!: GridApi;

  /**
   * Angular lifecycle hook that is called when the component is initialized.
   */
  ngOnInit(): void {
    this.totalPages = Math.ceil(this.totalDataCount / this.paginationPageSize);
  }

  /** Grid options configuration. */
  public gridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
      floatingFilter: true,
      flex: 1,
      enableValue: true,
      enableRowGroup: true,
    },
    sideBar: this.sideBar,
    paginationPageSize: this.limit,
    overlayLoadingTemplate:
      '<span class="ag-overlay-loading-center">Loading...</span>',
    overlayNoRowsTemplate:
      '<span class="ag-overlay-loading-center">No rows to show</span>',
  };

  /**
   * Loads data for the given page.
   * @param {number} page - The page number to load data for.
   */
  loadDatas(page: number): void {
    this.loading = true;
    this.updateItemIndices();
    this.gridApi.showLoadingOverlay();
    this.subscription.push(
      this.dataTableService
        .getTableData(page, this.paginationPageSize)
        .pipe(
          finalize(() => {
            this.gridApi.hideOverlay();
          })
        )
        .subscribe({
          next: (res) => {
            res.forEach((el) => {
              el['id'] = Number(el.id) + 1;
            });
            this.gridApi.setGridOption('rowData', res);
            this.loading = false;
          },
          error: (err) => {
            console.error('Error fetching data', err);
            this.loading = false;
          },
        })
    );
  }

  /**
   * Event handler for when the grid is ready.
   * @param params The event parameters.
   */
  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.params = params;
    this.gridApi.closeToolPanel();
    this.gridApi.setGridOption;
    this.loadDatas(this.currentPage);
  }

  /** Column definition for the ID field. */
  colDefId = {
    headerName: '#ID',
    field: 'id',
    minWidth: 100,
    filter: 'agTextColumnFilter',
    resizable: false,
    headerClass: 'fixed-size-header',
  };

  /** Column definition for the author name. */
  colDefName = {
    headerName: 'Author Name',
    field: 'author',
    minWidth: 200,
    filter: 'agTextColumnFilter',
    resizable: false,
    headerClass: 'fixed-size-header',
  };

  /** Column definition for the width field. */
  colDefWidth = {
    headerName: 'Width(px)',
    field: 'width',
    minWidth: 200,
    filter: 'agTextColumnFilter',
    resizable: false,
    headerClass: 'fixed-size-header',
  };

  /** Column definition for the height field. */
  colDefHeight = {
    headerName: 'Heigth(px)',
    field: 'height',
    minWidth: 200,
    filter: 'agTextColumnFilter',
    resizable: false,
    headerClass: 'fixed-size-header',
  };

  /** Column definition for the image field. */
  colDefImage = {
    headerName: 'Image',
    field: 'download_url',
    minWidth: 200,
    resizable: false,
    headerClass: 'fixed-size-header',
    cellRenderer: ImageRenderer,
  };

  /** Array of column definitions. */
  colDefs = [
    this.colDefId,
    this.colDefName,
    this.colDefWidth,
    this.colDefHeight,
    this.colDefImage,
  ];

  /** Column definition for the author name. */

  /**
   * Event handler for changing the page size of the grid.
   * @param event The event triggered by changing the page size input.
   */
  onPageSizeChanged(event: Event) {
    const eventValue = event.target as HTMLInputElement;
    this.paginationPageSize = Number(eventValue.value);
    this.gridApi?.setGridOption('paginationPageSize', Number(eventValue.value));
    this.totalPages = Math.ceil(this.totalDataCount / this.paginationPageSize);
  }

  /**
   * Loads the next page of data.
   */
  onNextPage(): void {
    if (this.currentPage * this.paginationPageSize < this.totalDataCount) {
      this.currentPage++;
      this.loadDatas(this.currentPage);
    }
  }

  /**
   * Loads the previous page of data.
   */
  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadDatas(this.currentPage);
    }
  }

  /**
   * Checks if the next page button should be disabled.
   * @returns {boolean} - True if the next page button should be disabled, false otherwise.
   */
  isNextPageDisabled(): boolean {
    return this.currentPage * this.paginationPageSize >= this.totalDataCount;
  }

  /**
   * Checks if the previous page button should be disabled.
   * @returns {boolean} - True if the previous page button should be disabled, false otherwise.
   */
  isPreviousPageDisabled(): boolean {
    return this.currentPage <= 1;
  }

  /**
   * Updates the start and end indices for the current page.
   */
  updateItemIndices(): void {
    this.startItemIndex = (this.currentPage - 1) * this.paginationPageSize + 1;
    this.endItemIndex = Math.min(
      this.currentPage * this.paginationPageSize,
      this.totalDataCount
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
