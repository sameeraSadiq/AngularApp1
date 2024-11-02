import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component"; // Adjust the path as necessary
import { ReservationsComponent } from "./reservations/reservations.component"; // Adjust the path as necessary
import { ProductRepository } from "./model/product.repository";
import { ReservationRepository } from "./model/reservation.repository";

@NgModule({
  declarations: [
    AppComponent,
    ReservationsComponent, // Make sure to declare the ReservationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // Add any other necessary imports
  ],
  providers: [
    ProductRepository,
    ReservationRepository,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
