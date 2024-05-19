import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiRes } from '../../models/interfaces/api';

/**
 * Service for handling master data operations.
 */
@Injectable({
  providedIn: 'root',
})
export class MasterService {
  /** HTTP client for making requests. */
  private http = inject(HttpClient);

  /**
   * Retrieves data from the given URL with pagination.
   * @param url The URL to fetch data from.
   * @param page The page number for pagination.
   * @param limit The number of items to fetch per page.
   * @returns An observable of the API response array.
   */
  get(url: string, page: number, limit: number): Observable<IApiRes[]> {
    return this.http.get<IApiRes[]>(`${url}?page=${page}&limit=${limit}`);
  }
}
