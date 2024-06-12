import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-section',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
  ],
  templateUrl: './admin-section.component.html',
  styleUrl: './admin-section.component.css',
  
})
export class AdminSectionComponent {

}
