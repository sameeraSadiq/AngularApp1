
// src/app/model/static.datasource.ts
import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { Observable, from } from "rxjs";
@Injectable()
    export class StaticDataSource {
        private products: Product[] = [
            new Product(1, "50point", "A boat for a family", 10),
            new Product(2, "Toronto Zoo", "Best place for kids ", 18),
            new Product(3, "lakeshore", "nice place for family picnik", 20),
            new Product(4, "Wanderland", "Good for all ages funn time", 30),
          
    ];
    getProducts(): Observable<Product[]> {
        return from([this.products]);
    }
}