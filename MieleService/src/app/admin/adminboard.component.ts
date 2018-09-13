import { Component, OnInit } from "@angular/core";
import { User } from "../_models/user";
import { UsersService } from "../_services/users.service";

@Component({
  selector: "app-adminboard",
  templateUrl: "./adminboard.component.html",
  styleUrls: ["./adminboard.component.css"]
})
export class AdminboardComponent implements OnInit {
  users: User[];

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }
}
