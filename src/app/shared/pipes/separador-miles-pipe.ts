import { Pipe, PipeTransform } from '@angular/core';



/**
 * @description
 * Pipe que formatea un número añadiendo puntos como separadores de miles y comas para decimales.
 * Convierte un número en una cadena con formato legible, con un número configurable de decimales.
 */
@Pipe({
  name: 'separadorMiles'
})
export class SeparadorMilesPipe implements PipeTransform {

  /**
   * @description
   * Transforma un número en una cadena formateada con separadores de miles y decimales.
   * Si el valor es nulo, indefinido o no es un número, retorna '0'.
   * @param value - Número a formatear.
   * @param decimales - Número de decimales a mostrar (por defecto, 2).
   * @returns {string} Cadena formateada con puntos como separadores de miles y, si aplica, una coma para los decimales.
   */
  transform(value: number | null | undefined, decimales: number = 2): string {
    if (value == null || isNaN(value)) {
      return '0';
    }

    // Convertir el número a una cadena con el número de decimales especificado
    const formattedNumber = value.toFixed(decimales);
    // Separar parte entera y decimal
    const [integerPart, decimalPart] = formattedNumber.split('.');

    // Agregar puntos como separadores de miles a la parte entera
    const integerWithSeparators = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Retornar la cadena formateada
    return decimales > 0 ? `${integerWithSeparators},${decimalPart}` : integerWithSeparators;
  }

}
