import { Component } from '@angular/core';
import { WebSocketService } from '../services/WSConnection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  message: string = '';

  constructor(private webSocketService: WebSocketService) {
    
  }

  // Enviar mensaje al backend
  send(): void {
    const messageBody = {
      action: 'echo',
      message: this.message
    };

    this.webSocketService.sendMessage(messageBody);
  }

  public connect(): void {
    this.webSocketService.connect();
  }

  public disconnect(): void {
    this.webSocketService.closeConnection();
  }

  ngOnInit(): void {
    this.webSocketService.getMessages().subscribe((message: any) => {
      console.log('Mensaje recibido desde el servidor:', message);
    });
  }

}
