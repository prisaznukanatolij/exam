interface Mediator {
  notify(sender: Component, event: string): void;
}

abstract class Component {
  protected mediator?: Mediator;

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

class Button extends Component {
  public click(): void {
    console.log("Button: click");

    this.mediator?.notify(this, "click");
  }
}

class Checkbox extends Component {
  public check(): void {
    console.log("Checkbox: checked");

    this.mediator?.notify(this, "check");
  }
}

class TextInput extends Component {
  private value = "";

  public setValue(value: string): void {
    this.value = value;
    console.log(`TextInput: value changed to "${this.value}"`);
    
    this.mediator?.notify(this, "input");
  }

  public getValue(): string {
    return this.value;
  }
}

class FormMediator implements Mediator {
  constructor(
    private button: Button,
    private checkbox: Checkbox,
    private textInput: TextInput
  ) {
    this.button.setMediator(this);
    this.checkbox.setMediator(this);
    this.textInput.setMediator(this);
  }

  public notify(sender: Component, event: string): void {
    if (sender instanceof Button && event === "click") {
      console.log("Mediator: Button was clicked.");

      if (this.textInput.getValue().trim() === "") {
        console.log("Mediator: Cannot submit form. Text input is empty.");
      } else {
        console.log("Mediator: Form submitted successfully.");
      }
    }

    if (sender instanceof Checkbox && event === "check") {
      console.log("Mediator: Checkbox state changed.");
    }

    if (sender instanceof TextInput && event === "input") {
      console.log("Mediator: Text input was updated.");
    }
  }
}

const button = new Button();
const checkbox = new Checkbox();
const textInput = new TextInput();

new FormMediator(button, checkbox, textInput);

checkbox.check();
button.click();

textInput.setValue("Hello Mediator");
button.click();