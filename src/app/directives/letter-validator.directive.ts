import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLetterValidator]',
})
export class LetterValidatorDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputElement: HTMLInputElement = this.el.nativeElement;
    var inputValue = inputElement.value;

    // Allow uppercase and lowercase Latin and Serbian Cyrillic letters and transform to uppercase
    const sanitizedValue = inputValue
      .replace(/[^A-Za-zА-Яа-яŽžŠšČčĐđĆćЋћЂђЉљЊњ]/g, '')
      .toUpperCase();

    // Update the input field
    this.renderer.setProperty(inputElement, 'value', sanitizedValue);
  }
}
