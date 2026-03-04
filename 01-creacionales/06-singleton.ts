/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

class DragonBalls {
  private static instance: DragonBalls;
  private ballsCollected: number;

  private constructor() {
    this.ballsCollected = 0;
  }

  public static getInstance(): DragonBalls {
    if (!DragonBalls.instance) {
      DragonBalls.instance = new DragonBalls();
      console.log("Las esferas del dragón han sido creadas.");
    }

    return DragonBalls.instance;
  }

  collectBall() {
    if (this.ballsCollected < 7) {
      this.ballsCollected = this.ballsCollected + 1;
      console.log(
        `Esfera recolectada. Total de esferas: ${this.ballsCollected}.`,
      );
      return;
    }

    console.log("Ya se han recolectado las 7 esferas del dragón.");
  }

  summonShenlong() {
    if (this.ballsCollected === 7) {
      console.log("Shenlong ha sido invocado, pide tu deseo!");
      return;
    }

    console.log(
      `Aún faltan ${7 - this.ballsCollected} esferas para invocar a Shenlong.`,
    );
  }
}

function main() {
  const goku = DragonBalls.getInstance();

  goku.collectBall();
  goku.collectBall();
  goku.collectBall();

  goku.summonShenlong();

  const vegeta = DragonBalls.getInstance();
  vegeta.collectBall();
  vegeta.collectBall();
  vegeta.collectBall();
  vegeta.collectBall();

  goku.summonShenlong();
}

main();
