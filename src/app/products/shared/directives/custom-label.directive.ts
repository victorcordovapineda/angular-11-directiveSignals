import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {

  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input()
  set colorReceived(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input()
  set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    console.log(this._errors)
    this.setErrorMessage();
  };

  private htmlElement?: ElementRef<HTMLElement>;

  constructor(private el: ElementRef<HTMLElement>) {
    // console.log('constructor de la directiva');
    console.log(el);
    this.htmlElement = el;
  }
  ngOnInit(): void {
    this.setStyle();
  }

  setStyle() {

    if (!this._color) return;

    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage() {
    if (!this.htmlElement) return;

    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    }

    const errors = Object.keys(this._errors);
    console.log(errors);
    if(errors.includes('required')){
      this.htmlElement.nativeElement.innerHTML = 'El campo es requerido';
      return;
    }

    if(errors.includes('minlength')){
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerHTML = `Es requerido ${current}/${min} caracteres`;
      return;
    }

    if(errors.includes('email')){
      this.htmlElement.nativeElement.innerHTML = 'El campo requiere formato de email';
      return;
    }
      

  }
}
