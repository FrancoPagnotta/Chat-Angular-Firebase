import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection!: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];

  constructor(private afs: AngularFirestore) { 
  }
  
  loadMessages() {
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date','desc').limit(5)); // Si le saco el limit, me trae todos los mensajes.
    return this.itemsCollection.valueChanges()
      .pipe(
        map((messages: Message[]) => {
          console.log(messages)
          this.chats = [];
          for (let message of messages) {
            this.chats.unshift(message); //unshift ingresa el mensaje siempre en la primera posicion del array
          }
        })
      )
  }

  // TODO: Falta el uid del usuario
  addMessage(text: string) {

    let message: Message = {
      name: 'test',
      message: text,
      date: new Date().getTime(),
    }
    
    return this.itemsCollection.add(message);
  }
}
