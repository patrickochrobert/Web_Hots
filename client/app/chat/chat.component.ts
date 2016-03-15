import { Component } from 'angular2/core';

@Component({
    selector: 'chat',
    template: `
    <form>
      <input [(ngModel)]="username" placeholder="My name" > 
      <button (click)="sendUserName()">Update user name</button>
    </form>
    <form>
      <input [(ngModel)]="message" placeholder="Message" >
      <button (click)="sendChat()">Send</button>
    </form>
    <ul>
      <li *ngFor="#mes of messages">{{mes}}</li>
    </ul>
    `
})
export class Chat {
    private ws: WebSocket;
    public username: string = '';
    public message: string = '';
    public messages: string[] = [];
    constructor() {
        this.setupWebSocket();
    }

    setupWebSocket() {
        console.log('connecting to ws...');
        this.ws = new WebSocket('ws://localhost:8080');

        this.ws.onopen = (event) => {
            console.log('connected to ws.');
        };

        // need to bind the this, otherwise "this" refers to the websocket
        this.ws.onmessage = _.bind(this.dispatchMessage, this);
    }
    
    onOpenConnection(connectionId:string, userList: any[]) {
        console.log('connectionId = ', connectionId, userList);
    }
    
    chat(user, message) {
        this.messages.push(user + ":" + message);
    }
    
    sendChat() {
        this.ws.send(JSON.stringify({call: "chat", data: { m: this.message }}));
        this.message = '';
    }
    
    sendUserName(connectionId:string, username:string) {
        this.ws.send(JSON.stringify({call: "registerUserName", data: { m: this.username }}));
    }
    
    dispatchMessage(event) {
        console.log('received', event.data);
        var data = JSON.parse(event.data);
        var calltarget = this[data.call];
        if (!calltarget) {
            console.log('unknown call method', data.call, data.data);
            return;
        }
        calltarget.apply(this, _.values(data.data));
    }
}