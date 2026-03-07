/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface MovementStrategy {
  move(): void;
}

class SwimFast implements MovementStrategy {
  move(): void {
    console.log("El pato nada rápidamente sobre el agua.");
  }
}

class FlyOverWater implements MovementStrategy {
  move(): void {
    console.log("El pato vuela sobre el agua.");
  }
}

class WalkClumsily implements MovementStrategy {
  move(): void {
    console.log("El pato camina torpemente.");
  }
}

class Duck {
  private name: string;
  private movementStrategy: MovementStrategy;

  constructor(name: string, strategy: MovementStrategy) {
    this.name = name;
    this.movementStrategy = strategy;

    console.log(`${name} listo para competir.`);
  }

  performMovement() {
    console.log(`${this.name} se prepara para moverse.`);
    this.movementStrategy.move();
  }

  setMovementStrategy(strategy: MovementStrategy) {
    this.movementStrategy = strategy;

    console.log(`${this.name} cambió de estrategia.`);
  }
}

function main() {
  const duck1 = new Duck("Pato Rápido", new SwimFast());
  const duck2 = new Duck("Pato Volador", new FlyOverWater());
  const duck3 = new Duck("Pato Torpe", new WalkClumsily());

  console.log("Comienza la carrera de patos:");
  duck1.performMovement();
  duck2.performMovement();
  duck3.performMovement();

  duck3.setMovementStrategy(new FlyOverWater());
  duck3.performMovement();
}

main();
