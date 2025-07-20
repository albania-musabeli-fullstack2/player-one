import { SeparadorMilesPipe } from './separador-miles-pipe';

describe('SeparadorMilesPipe', () => {

  let pipe: SeparadorMilesPipe;

  beforeEach(() => {
    pipe = new SeparadorMilesPipe();
  })


  it('debería crearse correctamente', () => {
    const pipe = new SeparadorMilesPipe();
    expect(pipe).toBeTruthy();
  });

  it('debería formatear un número sin decimales', () => {
    const result = pipe.transform(1234567.89, 0);
    expect(result).toBe('1.234.568'); // Se redondea
  });

  it('debería retornar "0" si el valor es null', () => {
    const result = pipe.transform(null);
    expect(result).toBe('0');
  });

  it('debería retornar "0" si el valor es undefined', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('0');
  });

  it('debería retornar "0" si el valor no es un número (NaN)', () => {
    const result = pipe.transform(NaN);
    expect(result).toBe('0');
  });

});