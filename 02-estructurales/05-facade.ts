/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { off } from "node:process";

class Projector {
  on() {
    console.log("Proyector encendido.");
  }

  turnOff() {
    console.log("Proyector apagado.");
  }
}

class SoundSystem {
  on() {
    console.log("Sistema de sonido encendido.");
  }

  off() {
    console.log("Sistema de sonido apagado.");
  }
}

class VideoPlayer {
  on() {
    console.log("Video player encendido.");
  }

  play(movie: string) {
    console.log(`Reproduciendo ${movie}`);
  }

  stop() {
    console.log("Película detenida");
  }

  off() {
    console.log("Video player apagado");
  }
}

class PopcornMaker {
  makingPopcorn() {
    console.log("Haciendo palomitas");
  }

  stopMakingPopcorn() {
    console.log("Apagándo máquina.");
  }
}

interface HomeTheatreFacadeOptions {
  projector: Projector;

  soundSystem: SoundSystem;

  videoPlayer: VideoPlayer;

  popcornMaker: PopcornMaker;
}

class HomeTheatreFacade {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornMaker: PopcornMaker;

  constructor({
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  }: HomeTheatreFacadeOptions) {
    this.projector = projector;
    this.soundSystem = soundSystem;
    this.videoPlayer = videoPlayer;
    this.popcornMaker = popcornMaker;
  }

  watchMovie(movie: string): void {
    console.log(`Preparando para ver la película.`);
    this.projector.on();
    this.soundSystem.on();
    this.popcornMaker.makingPopcorn();
    this.videoPlayer.on();
    this.videoPlayer.play(movie);

    console.log("Disfrute la película.");
  }

  endWatchingMovie(): void {
    console.log(`Preparando para detener la película.`);
    this.projector.turnOff();
    this.soundSystem.off();
    this.popcornMaker.stopMakingPopcorn();
    this.videoPlayer.stop();
    this.videoPlayer.off();

    console.log("Sistema apagado.");
  }
}

function main() {
  const projector = new Projector();
  const popcornMaker = new PopcornMaker();
  const soundSystem = new SoundSystem();
  const videoPlayer = new VideoPlayer();

  const homeTheatre: HomeTheatreFacade = new HomeTheatreFacade({
    projector,
    popcornMaker,
    soundSystem,
    videoPlayer,
  });

  homeTheatre.watchMovie("Coraline");
}

main();
