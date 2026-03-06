/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

class ChatRoom {
  private users: User[] = [];
  public title: string;

  constructor(title: string) {
    this.title = title;
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  sendMessage(sender: User, message: string): void {
    const usersToSend = this.users.filter((user) => user != sender);

    for (const user of this.users) {
      user.receiveMessage(sender, message);
    }
  }
}

class User {
  private username: string;
  private chatRoom: ChatRoom;

  constructor(username: string, chatRoom: ChatRoom) {
    this.username = username;
    this.chatRoom = chatRoom;

    chatRoom.addUser(this);
  }

  sendMessage(message: string): void {
    console.log(`${this.username} envía: ${message}`);
    this.chatRoom.sendMessage(this, message);
  }

  receiveMessage(sender: User, message: string): void {
    console.log(`${this.username} recibe de ${sender.username}: ${message}`);
  }
}

function main() {
  const chatRoom = new ChatRoom("Grupo de trabajo");

  const user1 = new User("Fernando", chatRoom);
  const user2 = new User("Cristhian", chatRoom);
  const user3 = new User("Alberto", chatRoom);

  user1.sendMessage("Hola a todos!");
  user2.sendMessage("Hola, ¿cómo están?");
  user3.sendMessage("Hola!");
}

main();
