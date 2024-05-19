import { Component, inject, OnDestroy } from '@angular/core';
import {
  ColDef,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  GridApi,
  GridOptions,
} from 'ag-grid-community';
import { map, Subscription } from 'rxjs';
import { DataTableService } from 'src/app/core/service/data-table/data-table.service';

import 'ag-grid-enterprise';
import { SideBarDef } from 'ag-grid-enterprise';
import { ImageRenderer } from './dt-image-renderer.component';
import { IApiRes } from 'src/app/core/models/interfaces/api';

/**
 * Component for displaying a data table using ag-Grid.
 */
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnDestroy {
  /** List of subscriptions to handle cleanup. */
  subscription: Subscription[] = [];

  /** Loading indicator. */
  loading = false;

  /** Total count of rows, assumed to be 100 for now. */
  totalCount = 100;

  /** Pagination options. */
  options = [10, 20, 30, 40, 50];

  /** Grid event parameters. */
  params?: GridReadyEvent;

  /** Rows per page. */
  limit = 30;

  /** Current page number. */
  currentPage = 1;

  /** Page size for pagination. */
  paginationPageSize: number = 30;

  /** Service for handling data table operations. */
  private dataTableService = inject(DataTableService);

  /** Definition of the sidebar for the grid. */
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

  /** Grid options configuration. */
  public gridOptions: GridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
      flex: 1,
    },
    rowModelType: 'serverSide',
    sideBar: this.sideBar,
    paginationPageSize: this.limit,
    overlayLoadingTemplate:
      '<span class="ag-overlay-loading-center">Loading...</span>',
    overlayNoRowsTemplate:
      '<span class="ag-overlay-loading-center">No rows to show</span>',
  };

  /** Grid API. */
  gridApi!: GridApi;

  /**
   * Event handler for when the grid is ready.
   * @param params The event parameters.
   */
  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.params = params;
    this.gridApi.closeToolPanel();
    this.gridApi.setHeaderHeight(60);
    this.gridApi.setGridOption;
    const dataSource: IServerSideDatasource = {
      getRows: (getRowParams) => {
        this.gridApi.showLoadingOverlay();
        this.dataTableService
          .getTableData(
            this.gridApi.paginationGetCurrentPage() + 1,
            this.gridApi.paginationGetPageSize()
          )
          .pipe(
            map((val) => {
              if (val.length === 0) {
                params.api.showNoRowsOverlay();
              } else {
                params.api.hideOverlay();
              }

              return val;
            })
          )
          .subscribe({
            next: (res) => {
              // const filteredData = this.filterDataByAuthor(
              //   res,
              //   getRowParams.request.filterModel?.['author']?.filter
              // ); Call filtering function

              this.updateRows(getRowParams, res); // Update grid with filtered data
            },
          });
      },
    };
    params.api.setGridOption('serverSideDatasource', dataSource);
  }

  /**
   * Updates the grid with new row data.
   * @param getRowParams The parameters for getting rows.
   * @param val The new row data.
   */
  private updateRows(
    getRowParams: IServerSideGetRowsParams,
    response: IApiRes[]
  ) {
    getRowParams.success({
      rowData: response,
      rowCount: this.totalCount,
    });
  }

  /**
   * Filters the data by author name.
   * @param data The data to filter.
   * @param authorFilter The filter string for the author.
   * @returns The filtered data.
   */
  filterDataByAuthor(data: IApiRes[], authorFilter: string): IApiRes[] {
    if (!authorFilter) {
      return data; // No filter applied, return all data
    }

    return data.filter((item) =>
      item.author?.toLowerCase().includes(authorFilter.toLowerCase())
    );
  }

  /** Column definition for the author name. */
  colDefName = {
    headerName: 'Author Name',
    field: 'author',
    minWidth: 250,
    filter: 'agTextColumnFilter',
    resizable: false,
    headerClass: 'fixed-size-header',
    filterParams: { suppressMatchAllPhrase: true },
  };

  /** Column definition for the image. */
  colDefImage = {
    headerName: 'Image',
    field: 'download_url',
    minWidth: 250,
    resizable: false,
    headerClass: 'fixed-size-header',
    cellRenderer: ImageRenderer,
  };

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [this.colDefName, this.colDefImage];

  /**
   * Event handler for changing the page size of the grid.
   * @param event The event triggered by changing the page size input.
   */
  onPageSizeChanged(event: Event) {
    const eventValue = event.target as HTMLInputElement;
    this.gridApi?.setGridOption('paginationPageSize', Number(eventValue.value));
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
