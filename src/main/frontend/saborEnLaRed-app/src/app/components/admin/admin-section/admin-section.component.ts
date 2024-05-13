import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-section',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './admin-section.component.html',
  styleUrl: './admin-section.component.css',
  
})
export class AdminSectionComponent {

}
