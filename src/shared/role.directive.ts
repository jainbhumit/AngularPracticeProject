import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appCustomDirective]',
})
export class CustomDirective {
  templateRef = inject(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);
  visibility = input.required<boolean>({ alias: 'appCustomDirective' });
  constructor() {
    effect(() => {
      if (this.visibility()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
