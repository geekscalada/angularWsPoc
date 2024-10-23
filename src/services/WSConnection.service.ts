import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket$: WebSocketSubject<any> | undefined
  private url = 'wss://ycl4wzln45.execute-api.us-west-2.amazonaws.com/prod';

  constructor() {
      
  }

  // Conectar al WebSocket
  public connect(): void {
    console.log('Conectando al WebSocket... en  ' + this.url);
    this.socket$ = webSocket(this.url);

    this.getMessages().subscribe((message: any) => {
        console.log('Mensaje recibido desde el servidor:', message);
      });

  }

  // Enviar un mensaje
  sendMessage(message: { action: string; message: string }): void {
    this.socket$?.next(message);
  }

  // Escuchar los mensajes desde el servidor
  getMessages(): Observable<any> {
    return this.socket$ ? this.socket$.asObservable() : EMPTY;
  }

  // Cerrar la conexión
  public closeConnection(): void {
    this.socket$?.complete();
  }

  ngOnDestroy(): void {
    this.closeConnection();
  }
}
