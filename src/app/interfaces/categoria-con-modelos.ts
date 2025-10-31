export interface CategoriaConModelos {
  categoria: string;
  modelos: {
    idModelo: number;
    nombre: string;
    imagenes: string[];
  }[];
}
