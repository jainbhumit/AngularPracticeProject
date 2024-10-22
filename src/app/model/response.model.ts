export interface Product {
  id : string;
  title : string;
  price : number;
  description : string;
  images : string[];
  creationAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  } 
}

export type Item = {
  title: string | null,
  price: number | null |undefined;
  description: string | null |undefined;
  categoryId: number | null |undefined;
  images: (string | null)[] | undefined
}

export type EditBody = {
    title: string | null;
    price: number | null;

}