export interface CreateVisitInterface {
  id: number;
  ip: string;
  country?: string;
  region?: string;
  city?: string;
  browser_name?: string;
  browser_version?: string;
  os_name?: string;
  os_version?: string;
  referrer: string;
}
