import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { User } from "src/app/_models/user";
import { UsersService } from "../_services/users.service";

@Component({
  selector: "app-agent",
  templateUrl: "./agent.component.html",
  styleUrls: ["./agent.component.css"]
})
export class AgentComponent implements OnInit {
  agents: User[];

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(res => {
      this.agents = res;
    });
  }
}
