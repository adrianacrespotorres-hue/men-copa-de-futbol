export enum CourseType {
  ENTRADA = 'Entrada',
  PLATO_FUERTE = 'Plato Fuerte',
  POSTRE = 'Postre',
  BEBIDA = 'Bebida',
}

export interface Dish {
  course: CourseType | string;
  name: string;
  country: string;
  moment: string;
  description: string;
  reasoning: string;
}

export interface MenuResponse {
  menuTitle: string;
  themeDescription: string;
  dishes: Dish[];
}
