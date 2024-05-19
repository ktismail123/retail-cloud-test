import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  constructor(private router: Router) {}

  navigateToAuthorList() {
    this.router.navigate(['/data-table']);
  }

  navigateToImageGallery() {
    this.router.navigate(['/image-gallery']);
  }
 
}
