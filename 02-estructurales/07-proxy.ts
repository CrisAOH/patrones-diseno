/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

class Player {
  name: string;
  level: number;

  constructor(name: string, level: number) {
    this.name = name;
    this.level = level;
  }
}

interface Room {
  enter(player: Player): void;
}

class SecretRoom implements Room {
  enter(player: Player): void {
    console.log(`Bienvenido a la sala secreta, ${player.name}`);
    console.log("Un gran enemigo te espera.");
  }
}

// Clase proxy
class MagicPortal implements Room {
  private secretRoom: Room;

  constructor(secretRoom: Room) {
    this.secretRoom = secretRoom;
  }

  enter(player: Player): void {
    if (player.level >= 10) {
      this.secretRoom.enter(player);
      return;
    }

    console.log(
      "No tienes el nivel suficiente para acceder a la sala secreta.",
    );
  }
}

function main() {
  const portal = new MagicPortal(new SecretRoom());

  const player1 = new Player("Aventurero", 5);
  const player2 = new Player("Guerrero", 15);

  console.log("Aventurero intenta entrar al portal.");
  portal.enter(player1);

  console.log("\nGuerrero intenta entrar al portal.");
  portal.enter(player2);
}

main();
