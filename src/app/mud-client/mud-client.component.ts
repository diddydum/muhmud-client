import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mud-client',
  templateUrl: './mud-client.component.html',
  styleUrls: ['./mud-client.component.css']
})
export class MudClientComponent implements OnInit {
  websocket: WebSocket;
  messages = [];
  command = '';

  ngOnInit() {
    // TODO: put ws stuff in its own class
    this.websocket = new WebSocket('ws://localhost:8080/ws');
    this.websocket.onclose = () => console.log('DEBUG onclose occurred');
    this.websocket.onopen = () => console.log('DEBUG onopen occurred');
    this.websocket.onerror = () => console.log('DEBUG onerror occurred');
    this.websocket.onmessage = (event) => {
      console.log('DEBUG onmessage occurred');
      this.messages.push(event.data);
    };
  }

  onCommandSubmit() {
    this.websocket.send(this.command);

    this.command = '';
  }

  isConnected() {
    return this.websocket && this.websocket.readyState === WebSocket.OPEN;
  }

  isCommandEmpty() {
    return this.command.length === 0;
  }
}
