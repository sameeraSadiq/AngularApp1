import { Component, OnInit } from "@angular/core";
import { Product } from "../model/product.model"; 
import { ProductRepository } from "../model/product.repository"; 
import { ReservationRepository } from "../model/reservation.repository";

@Component({
  selector: "reservations",
  templateUrl: "./reservations.component.html",
})
export class ReservationsComponent implements OnInit {
  selectedProductId: number | null = null; 
  selectedFromTime: string | null = null; 
  selectedToTime: string | null = null; 
  selectedDate: string | null = null; 
  products: Product[] = []; 
  selectedProduct: Product | null = null; 
  availableTimes: string[] = [];
  minDate: string = new Date().toISOString().split("T")[0]; // Disable past dates
  message: string | null = null; // Message property for feedback

  constructor(
    private productRepository: ProductRepository,
    private reservationRepository: ReservationRepository
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.populateAvailableTimes();
  }

  private loadProducts(): void {
    this.productRepository.getProducts().subscribe({
      next: (products) => this.products = products,
      error: (err) => console.error("Failed to load products:", err)
    });
  }

  private populateAvailableTimes(): void {
    this.availableTimes = [];
    const startHour = 9;
    const endHour = 18;
    
    for (let hour = startHour; hour < endHour; hour+=3) {
      const hourString = hour < 10 ? `0${hour}` : `${hour}`;
      this.availableTimes.push(`${hourString}:00` );
    }
    this.availableTimes.push('18:00');
  }

  selectProduct(id: number | undefined): void {
    if (id !== undefined) {
      this.selectedProductId = id;
      this.selectedProduct = this.products.find(product => product.id === id) || null;
    } else {
      console.error("Product ID is undefined");
    }
  }

  reserve(): void {
    if (this.isReservationValid()) {
      const fromDateTime = new Date(`${this.selectedDate}T${this.selectedFromTime}:00`);
      const toDateTime = new Date(`${this.selectedDate}T${this.selectedToTime}:00`);
  
      if (this.validateTimeSlot(fromDateTime, toDateTime)) {
        if (this.selectedProductId !== null) { // Ensure selectedProductId is not null
          this.reservationRepository.addReservation(this.selectedProductId, fromDateTime, toDateTime);
  
          // Set the confirmation message
          this.message = `Booking created successfully! You have reserved ${this.selectedProduct?.name} from ${this.selectedFromTime} to ${this.selectedToTime}.`;

          this.resetForm();
        } else {
          this.message = "Failed to create booking: Product ID is invalid.";
        }
      }
    } else {
      this.message = "Please select a product, date, and valid time slots before booking.";
    }
  }

  private isReservationValid(): boolean {
    return !!(this.selectedProductId && this.selectedDate && this.selectedFromTime && this.selectedToTime);
  }

  validateTimeSlot(fromTime: Date, toTime: Date): boolean {
    const timeDifference = (toTime.getTime() - fromTime.getTime()) / (1000 * 60 * 60); // Difference in hours

    if (timeDifference < 1 || timeDifference > 3) {
      this.message = "The booking duration must be between 1 hour and 3 hours.";
      return false;
    }
    
    if (fromTime.getHours() < 9 || toTime.getHours() > 18 || (toTime.getHours() === 18 && toTime.getMinutes() > 0)) {
      this.message = "You can only book time slots between 9:00 AM and 6:00 PM.";
      return false;
    }

    if (fromTime >= toTime) {
      this.message = "The start time must be before the finish time.";
      return false;
    }

    return true;
  }

  resetForm(): void {
    this.selectedProductId = null;
    this.selectedFromTime = null;
    this.selectedToTime = null;
    this.selectedDate = null;
    this.selectedProduct = null;
    this.message = null; // Clear any existing messages
  }

  selectHome(): void {
    this.resetForm();
    this.message = "You have returned to the Home screen.";
  }
}