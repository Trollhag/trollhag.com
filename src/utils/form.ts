
import type { z } from "zod";

interface FormInputElements {
  wrapper: Element | null;
  input: HTMLInputElement | null;
  label: Element | null;
  error: Element | null;
}
export class FormInput {
  public form: HTMLFormElement;
  public name: string;
  public readonly elements: FormInputElements = {
    wrapper: null,
    input: null,
    label: null,
    error: null,
  };
  public error: z.ZodIssue | null = null;

  constructor(form: HTMLFormElement, fieldName: string) {
    this.form = form;
    this.name = fieldName;
    this.elements.wrapper =
      form.querySelector(`[c-input=${fieldName}]`) ?? null;
    if (this.elements.wrapper) {
      this.elements.input = this.elements.wrapper.querySelector(
        `[name=${fieldName}]`,
      );
      this.elements.label =
        this.elements.wrapper.querySelector("[c-input-label]");
      this.elements.error =
        this.elements.wrapper.querySelector("[c-input-error]");
    }
  }

  public orUndefined() {
    if (!this.elements.wrapper) return undefined;
    return this;
  }

  public clearError() {
    this.elements.input?.classList.remove("border-red-500");
    if (this.elements.error) this.elements.error.textContent = "";
  }

  public setError(error: z.ZodIssue) {
    if (this.error) return;
    this.error = error;
    this.elements.input?.classList.add("border-red-500");
    if (this.elements.error && this.name === error.path[0]) {
      this.elements.error.textContent = error.message;
    }
  }

  public reset() {
    this.clearError();
    if (this.elements.input) {
      switch (this.elements.input.type) {
        case "checkbox":
          this.elements.input.checked = false;
          break;
        default:
          this.elements.input.value = "";
      }
    }
  }

  public get value() {
    const { input } = this.elements;
    switch (input?.type) {
      case "checkbox":
        return (input.checked && input.value) || undefined;
      default:
        console.log(this.name, this.elements)
        return input?.value;
    }
  }
}
