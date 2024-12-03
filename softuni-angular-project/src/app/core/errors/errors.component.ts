import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-errors',
  standalone:true,
  imports: [],
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.css'
})
export class ErrorsComponent {
@Input() errorContainer:string[] = [];
@Output() changeEmitter: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  onAnimationEnd(){
    this.changeEmitter.emit(true);
    return;
  }
}
