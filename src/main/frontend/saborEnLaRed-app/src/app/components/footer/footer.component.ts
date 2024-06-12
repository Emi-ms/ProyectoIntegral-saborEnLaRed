import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor( private router: Router) { }

  navigateToAboutDiv() {
    this.router.navigate(['/'], { fragment: 'about-div' });
  }

}
