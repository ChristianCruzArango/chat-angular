import { IMensaje } from './../../../Interfaces/Imensaje';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.css']
})
export class ChatBodyComponent implements OnInit {

  @Input() mensajes:IMensaje [] = [];

  constructor() { }

  ngOnInit() {
  }

}
