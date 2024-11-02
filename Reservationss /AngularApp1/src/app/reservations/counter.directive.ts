import {
  Directive,
  ViewContainerRef,
  TemplateRef,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from "@angular/core";

@Directive({
  selector: "[counterOf]"
})
export class CounterDirective implements OnInit, OnChanges {
  
  @Input("counterOf") counter: number = 0; // Ensures this is a number

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<CounterDirectiveContext>
  ) {}

  ngOnInit() {
    this.renderTemplate(); // Render initially
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['counter']) {
      this.renderTemplate(); // Re-render when counter changes
    }
  }

  private renderTemplate() {
    this.container.clear(); // Clear previous views
    const count = Math.max(0, this.counter); // Ensure non-negative count
    for (let i = 0; i < count; i++) {
      this.container.createEmbeddedView(this.template, new CounterDirectiveContext(i + 1));
    }
  }
}

class CounterDirectiveContext {
  constructor(public $implicit: number) {} // Use number type for clarity
}