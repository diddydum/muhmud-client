import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-mud-client',
  templateUrl: './mud-client.component.html',
  styleUrls: ['./mud-client.component.css']
})
export class MudClientComponent implements OnInit {
  constructor(private authService: AuthService) {}

  websocket: WebSocket;
  messages = [];
  command = '';
  authExpired = false;

  ngOnInit() {
    // TODO: put ws stuff in its own class
    this.websocket = new WebSocket('ws://localhost:8080/ws?token='
        + encodeURIComponent(this.authService.token));
    console.log(this.websocket.url);
    this.websocket.onclose = (ev) => {
      console.log(`DEBUG onclose occurred: ${ev.code}`);
      if (ev.code === 4000) {
        // Auth must be expired
        this.authService.clearToken();
        this.authExpired = true;
      }
    };
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
