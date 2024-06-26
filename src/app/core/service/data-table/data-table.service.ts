import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiRes } from '../../models/interfaces/api';
import { MasterService } from '../master/master.service';

/**
 * Service for handling data table operations.
 */
@Injectable({
  providedIn: 'root',
})
export class DataTableService {
  /** Injected instance of MasterService. */
  private masterService = inject(MasterService);

  /** Base URL for the data table API. */
  BASE_URL = environment.BASE_URL;

  /**
   * Retrieves table data from the API with pagination.
   * @param page The page number for pagination.
   * @param limit The number of items to fetch per page.
   * @returns An observable of the API response array.
   */
  getTableData(page: number, limit: number): Observable<IApiRes[]> {
    return this.masterService.get(this.BASE_URL, page, limit);
  }
}
