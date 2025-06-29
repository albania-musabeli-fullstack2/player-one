import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separadorMiles'
})
export class SeparadorMilesPipe implements PipeTransform {

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
