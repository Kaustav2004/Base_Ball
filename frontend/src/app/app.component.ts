// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { provideRouter, Routes } from '@angular/router';

// // Import Components

// import { HomeComponent } from './myComponents/home/home.component';
// import { PlayersComponent } from './myComponents/all-player/all-player.component';
// import { AllTeamsComponent } from './myComponents/all-teams/all-teams.component';
// import { ScheduleComponent } from './myComponents/schedule/schedule.component';
// import { ToastComponent } from '../../toast.component';

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'all-players', component: PlayersComponent },
//   { path: 'all-teams', component: AllTeamsComponent },
//   { path: 'schedule', component: ScheduleComponent },
// ];

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, ToastComponent],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent {}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationService } from './services/recommendation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h3>Recommended Teams</h3>
      <ul>
        <li *ngFor="let teamId of recommendations">{{ teamId }}</li>
      </ul>
    </div>
  `,
})
export class AppComponent implements OnInit {
  recommendations: number[] = [];

  // Example favorite teams; in a real app, this might come from the user's profile.
  favTeams: number[] = [201, 202];

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit(): void {
    this.recommendationService.getRecommendations(this.favTeams).subscribe(
      (response) => {
        this.recommendations = response.recommendations;
      },
      (error) => {
        console.error('Error fetching recommendations', error);
      }
    );
  }
}
