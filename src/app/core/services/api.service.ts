import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = process.env['API_BASE_URL'];
  private readonly defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  constructor(private http: HttpClient) {}

  private prepareRequest(
    method: string,
    endpoint: string,
    data?: any,
    customHeaders?: Record<string, string>
  ) {
    const url = `${this.baseUrl}/${endpoint.replace(/^\//, '')}`;
    const headers = { ...this.defaultHeaders, ...customHeaders };
    const params = new HttpParams();

    return new HttpRequest(method, url, data, {
      headers: new HttpHeaders(headers),
      params,
      withCredentials: true
    });
  }

  get(endpoint: string, params?: any, headers?: Record<string, string>) {
    const request = this.prepareRequest('GET', endpoint, null, headers);
    return this.http.request(request);
  }

  post(endpoint: string, body: any, headers?: Record<string, string>) {
    const request = this.prepareRequest('POST', endpoint, body, headers);
    return this.http.request(request);
  }

  put(endpoint: string, body: any, headers?: Record<string, string>) {
    const request = this.prepareRequest('PUT', endpoint, body, headers);
    return this.http.request(request);
  }

  patch(endpoint: string, body: any, headers?: Record<string, string>) {
    const request = this.prepareRequest('PATCH', endpoint, body, headers);
    return this.http.request(request);
  }

  delete(endpoint: string, body: any, headers?: Record<string, string>) {
    const request = this.prepareRequest('DELETE', endpoint, body, headers);
    return this.http.request(request);
  }
}
