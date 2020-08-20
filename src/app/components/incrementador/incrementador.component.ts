import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  // @Input('valor') public progress = 30;
  @Input() public progress = 30;
  @Input() public btnClass = 'btn-primary';


  @Output() public valueExit = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  changeValue(value: number): any {
    if (this.progress >= 100 && value >= 0) {
        this.valueExit.emit(100);
        return this.progress = 100;
    }
    if (this.progress <= 0 && value < 0) {
      this.valueExit.emit(0);
      return this.progress = 0;
    }
    this.progress = this.progress + value;
    this.valueExit.emit(this.progress);
  }

  onChange(value: number): any {
    if (value >= 100) {
        this.progress = 100;
    } else if (value <= 0) {
        this.progress = 0;
    } else {
        this.progress = value;
    }
    this.valueExit.emit(this.progress);
  }

}
