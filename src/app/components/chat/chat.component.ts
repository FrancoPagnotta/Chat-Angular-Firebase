import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string = '';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.loadMessages()
      .subscribe(res => console.log(res))
  }

  sendMessage(): void {
    console.log(this.message);
  }

}
