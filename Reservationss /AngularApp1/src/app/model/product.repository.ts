

import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { Product } from "./product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductRepository {
  private products: Product[] = [
    new Product(1, "50point", "A boat for every one", 275),
    new Product(2, "Lakeshore", "best place for family", 48.95),
    new Product(3, "Toronto Zoo", "Funn place for kids", 19.5),
    new Product(4, "Wanderland", "Every one can a have good time", 34.95),
   
  ];

  getProducts(): Observable<Product[]> {
    return from([this.products]); // Returns an observable containing the array
  }

  getProduct(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return from([product]); // Returns an observable containing the product or undefined
  }
}