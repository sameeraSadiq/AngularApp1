export class Reservation {
  constructor(
    public id: number,             // Unique identifier for the reservation
    public locationId: number,     // The ID of the location being reserved
    public timeSlot: Date,         // The date and time of the reservation
  
  ) {}
}
