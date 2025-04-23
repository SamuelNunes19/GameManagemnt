import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private apiUrl = 'https://api.rawg.io/api/platforms?key=03f9f79f206e4537b46e87c556802c7f';

  constructor(private http: HttpClient) {}

  getPlatforms(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}