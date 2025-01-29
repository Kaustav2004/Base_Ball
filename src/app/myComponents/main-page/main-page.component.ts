import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  onNavigate(): void {
    this.router.navigate(['/auth']); 
  }
}
