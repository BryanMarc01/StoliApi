/* eslint-disable prettier/prettier */
export class Venta {
  param: string;
  constructor(
    public id: string,
    public cliente: string,
    public arma: string,
    public cantidad: number,
    public precioTotal: number,
    public fecha: Date,
  ) {}
}
