import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RecommendationResponse {
  recommendations: number[];
}

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  // Use the Express endpoint; Angular will use the same domain if you set up a proxy or run from the same server.
  private apiUrl = 'http://localhost:3000/api/recommendations';

  constructor(private http: HttpClient) {}

  // Pass the user's favorite teams as an array of numbers.
  getRecommendations(favTeams: number[]): Observable<RecommendationResponse> {
    const payload = { favTeams };
    return this.http.post<RecommendationResponse>(this.apiUrl, payload);
  }
}
