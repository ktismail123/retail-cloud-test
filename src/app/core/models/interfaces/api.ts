/**
 * Interface representing the structure of the API response.
 */
export interface IApiRes {
  /** Unique identifier for the resource. */
  id: string | number;
  /** Author of the resource. */
  author: string;
  /** Width of the resource. */
  width: number;
  /** Height of the resource. */
  height: number;
  /** URL of the resource. */
  url: string;
  /** Download URL of the resource. */
  download_url: string;
}
