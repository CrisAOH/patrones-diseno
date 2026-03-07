/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { sleep } from "../helpers/sleep.ts";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */

interface State {
  name: string;

  insertMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

class VendingMachine {
  private state: State;

  constructor() {
    this.state = new WaitingForMoney(this);
  }

  insertMoney() {
    this.state.insertMoney();
  }

  selectProduct() {
    this.state.selectProduct();
  }

  dispenseProduct() {
    this.dispenseProduct();
  }

  setState(newState: State) {
    this.state = newState;
  }

  getState(): string {
    return this.state.name;
  }
}

class WaitingForMoney implements State {
  public name: string = "Esperando dinero";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log("Dinero insertado. Ahora puedes seleccionar un producto.");

    this.vendingMachine.setState(new SelectProduct(this.vendingMachine));
  }

  selectProduct(): void {
    console.log("Primero se debe insertar dinero.");
  }

  dispenseProduct(): void {
    console.log("Primero se debe insertar dinero.");
  }
}

class SelectProduct implements State {
  public name: string = "Seleccionando producto";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log("Por favor, selecciona un producto.");
  }

  selectProduct(): void {
    this.vendingMachine.setState(new DispatchProduct(this.vendingMachine));
  }

  dispenseProduct(): void {
    console.log("Primero selecciona un producto.");
  }
}

class DispatchProduct implements State {
  public name: string = "Despachando producto";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log("Espera a que se entregue el producto.");
  }

  selectProduct(): void {
    console.log("Espera a que se entregue el producto.");
  }

  dispenseProduct(): void {
    console.log("Entregando producto");

    this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));
  }
}

async function main() {
  const vendingMachine = new VendingMachine();

  let selectedOption: string | null = "4";

  do {
    console.clear();

    console.log(`Selecciona una opción: ${vendingMachine.getState()}`);

    selectedOption = prompt(`1. Insertar dinero
        2. Seleccionar producto
        3. Disepnsar producto
        4. Salir
        
        Opción: `);

    switch (selectedOption) {
      case "1":
        vendingMachine.insertMoney();
        break;
      case "2":
        vendingMachine.selectProduct();
        break;
      case "3":
        vendingMachine.dispenseProduct();
        break;
      case "4":
        console.log("Saliendo del sistema");
        break;
      default:
        console.log("Opción no válida");
        break;
    }

    await sleep(3000);
  } while (selectedOption !== "4");
}

main();
