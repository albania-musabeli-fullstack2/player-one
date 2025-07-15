import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarAdmin } from '../../components/navbar-admin/navbar-admin';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    NavbarAdmin,
    Sidebar,
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {

}
