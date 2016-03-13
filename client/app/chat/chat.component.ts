import { Component } from 'angular2/core';

@Component({
    selector: 'chat',
    template: `
    <input [(ngModel)]="message" placeholder="Message" >
    <button (click)="sendData()">Send</button>
    
    <ul>
    <li *ngFor="#mes of messages">{{mes}}</li>
    </ul>
    `
})
export class Chat {
    private ws: WebSocket;
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

        this.ws.onmessage = (event) => {
            console.log('received', event.data);
            this.messages.push(event.data);
        };
    }
    
    sendData() {
        this.ws.send(this.message);
    }
}