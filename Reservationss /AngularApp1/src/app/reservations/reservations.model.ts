import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from "../model/model.module"; // Ensure your model module exists
import { ReservationsComponent } from "./reservations.component"; // Import your ReservationsComponent

@NgModule({
  imports: [
    BrowserModule,  // Browser module for bootstrapping
    FormsModule,    // Forms module for template-driven forms
    ModelModule     // Import your model module
  ],
  declarations: [
    ReservationsComponent // Declare the ReservationsComponent
  ],
  exports: [
    ReservationsComponent // Export the ReservationsComponent for use in other modules
  ]
})
export class ReservationsModule {} // Export the module for use in the app