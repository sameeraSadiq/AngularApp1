import { Injectable } from "@angular/core";
import { Reservation } from "./reservations.model";

@Injectable()
export class ReservationRepository {
  private reservations: Reservation[] = [];
  private idCounter = 1; // To generate unique reservation IDs

  addReservation(locationId: number, timeSlot: Date, toDateTime: Date): void {
    this.reservations.push(new Reservation(this.idCounter++, locationId, timeSlot));
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }
}
