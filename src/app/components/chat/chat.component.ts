import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string = '';

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.loadMessages().subscribe();
  }

  sendMessage(): void {
    if (this.message.length === 0) {
      return 
    } else {
      this.chatService.addMessage(this.message)
        .then(() => this.message = '')
        .catch((err) => console.log(err))
    }
  }

}
