import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../../e-commerce/services/localStorage/local-storage-service';

@Component({
  selector: 'e-commerce-navbar',
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {

  private localStoSrv = inject(LocalStorageService);
  public usuario = computed(()=> this.localStoSrv.usuarioLogin());

  ngOnInit() {}
  
}
