/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */

import { off } from "node:process";

interface Command {
  execute(): void;
}

class Light {
  turnOn(): void {
    console.log("La luz está encendida.");
  }

  turnOff(): void {
    console.log("La luz está apagada.");
  }
}

class Fan {
  on(): void {
    console.log("El ventilador está encendido.");
  }

  off(): void {
    console.log("El ventilador está apagado.");
  }
}

class LightOnCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOff();
  }
}

class FanOnCommand implements Command {
  private fan: Fan;

  constructor(fan: Fan) {
    this.fan = fan;
  }

  execute(): void {
    this.fan.on();
  }
}

class FanOffCommand implements Command {
  private fan: Fan;

  constructor(fan: Fan) {
    this.fan = fan;
  }

  execute(): void {
    this.fan.off();
  }
}

class RemoteControl {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command) {
    this.commands[button] = command;
  }

  pressButton(button: string): void {
    if (this.commands[button]) {
      this.commands[button].execute();
      return;
    }

    console.log("No se ha asignado un comando a ese botón.");
  }
}

function main() {
  const remoteControl = new RemoteControl();
  const light = new Light();
  const fan = new Fan();

  // Crear comandos
  const lightOnCommand = new LightOnCommand(light);
  const lightOffCommand = new LightOffCommand(light);
  const fanOnCommand = new FanOnCommand(fan);
  const fanOffCommand = new FanOffCommand(fan);

  // Asignar acciones
  remoteControl.setCommand("1", lightOnCommand);
  remoteControl.setCommand("2", lightOffCommand);
  remoteControl.setCommand("3", fanOnCommand);
  remoteControl.setCommand("4", fanOffCommand);

  let continueProgram = true;

  do {
    console.clear();

    const pressedButton =
      prompt(
        `Presiona un botón del control: 
        1. Encender la luz.
        2. Apagar la luz.
        3. Encender el ventilador.
        4. Apagar ventilador.
        
        Botón: `,
      ) ?? "";

    remoteControl.pressButton(pressedButton);

    const continueProgramResponse = prompt(
      `\n¿Deseas continuar? (y/n)`,
    )?.toLowerCase();

    continueProgram = continueProgramResponse === "n" ? false : true;
  } while (continueProgram);
}

main();
