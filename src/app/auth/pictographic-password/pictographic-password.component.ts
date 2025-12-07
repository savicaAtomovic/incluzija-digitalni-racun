import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-pictographic-password',
  templateUrl: './pictographic-password.component.html',
  styleUrls: ['./pictographic-password.component.scss']
})
export class PictographicPasswordComponent {
  @Output() passwordChange = new EventEmitter<string[]>();
  
  symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'];
  selectedSymbols: string[] = [];

  @Input() set password(value: string[]) {
    this.selectedSymbols = value;
  }

  selectSymbol(symbol: string) {
    if (this.selectedSymbols.length < 3) {
      this.selectedSymbols.push(symbol);
      this.passwordChange.emit(this.selectedSymbols);
    }
  }

  clear() {
    this.selectedSymbols = [];
    this.passwordChange.emit(this.selectedSymbols);
  }
}
