/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

interface Observer {
  notify(videoTitle: string): void;
}

class YouTubeChannel {
  private subscribers: Observer[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  subscribe(observer: Observer): void {
    this.subscribers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== observer);
  }

  uploadVideo(videoTitle: string): void {
    console.log(`${this.name} ha subido un nuevo video.`);

    for (const subscriber of this.subscribers) {
      subscriber.notify(videoTitle);
    }
  }
}

class Subscriber implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  notify(videoTitle: string): void {
    console.log(`${this.name} ha sido notificado. Nuevo video ${videoTitle}`);
  }
}

function main() {
  const channel = new YouTubeChannel("Canal de YouTube");
  const cesar = new Subscriber("César");
  const melissa = new Subscriber("Melissa");

  channel.subscribe(cesar);
  channel.subscribe(melissa);

  channel.uploadVideo("Mi primer video.");

  channel.unsubscribe(cesar);
}
