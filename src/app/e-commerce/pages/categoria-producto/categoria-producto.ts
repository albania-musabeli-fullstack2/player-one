import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categoria-producto',
  imports: [
    CommonModule,
  ],
  templateUrl: './categoria-producto.html',
  styleUrl: './categoria-producto.scss'
})
export default class CategoriaProducto implements OnInit, OnDestroy {

  nombreCategoria: string | null = null;
  private routeSubscription: Subscription | undefined;

  // Inyección de dependencias
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.nombreCategoria = params.get('id')
      console.log(this.nombreCategoria)
    })
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription?.unsubscribe();
    }
  }



}
