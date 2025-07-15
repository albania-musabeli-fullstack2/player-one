import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoFecha',
  standalone: true
})
export class FormatoFechaPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    // Asegurar que esté en formato yyyy-mm-dd
    const fechaStr = typeof value === 'string' ? value.trim() : null;

    if (fechaStr && /^\d{4}-\d{2}-\d{2}$/.test(fechaStr)) {
      const [anio, mes, dia] = fechaStr.split('-');
      return `${dia}/${mes}/${anio}`;
    }

    // Si es Date o string con formato distinto, intentar parsear
    const fecha = new Date(value);
    if (isNaN(fecha.getTime())) return '';

    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`;
  }
}
