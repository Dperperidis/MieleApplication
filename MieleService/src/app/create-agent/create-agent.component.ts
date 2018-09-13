import { Component, OnInit } from '@angular/core';
import { Agent } from '../_models/agents';

@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.css']
})
export class CreateAgentComponent implements OnInit {
agent = new Agent();

  constructor() { }

  ngOnInit() {
  }

}
