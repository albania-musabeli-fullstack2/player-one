import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-e-commerce-layout',
  imports: [
    RouterOutlet,
    Navbar,
  ],
  templateUrl: './e-commerce-layout.html',
  styleUrl: './e-commerce-layout.scss'
})
export class ECommerceLayout {

}
