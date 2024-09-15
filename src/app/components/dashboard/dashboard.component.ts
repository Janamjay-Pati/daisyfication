import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isActive = false;
  splashes: { top: string, left: string, color: string, title: string, transform: string }[] = [];

  constructor(private router: Router) {}

  triggerAnimation() {
    this.isActive = true;
    setTimeout(() => this.createSplashes(), 500);
  }

  createSplashes() {
    const numSplashes = 3; // Number of colorful splashes
    const colors = ['#155273', '#155273', '#155273'];
    const titles = ["Me?", "Delight's in?", 'Detests?'];
    const angles = [-2, -270, -9]

    this.splashes = angles.map((angle, index) => {
      const x = Math.cos(angle) * 150;
      const y = Math.sin(angle) * 150;
      return {
        top: `calc(50% + ${y}px)`,
        left: `calc(50% + ${x}px)`,
        color: colors[index],
        title: titles[index],
        transform: `translate(${x}px, ${y}px)`
      };
    });
  }

  onSplashClick(splash: any) {
    if (splash?.title === "Me?") {
      this.router.navigate(['/personal'])
    }
  }

}
