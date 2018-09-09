import { Component, OnInit } from "@angular/core";
import { TechService } from "../../_services/tech.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { User } from "../../_models/user";

import { ExternalTechs } from "../../_models/externalTechs";
import { ToastrService } from "ngx-toastr";
import { BsDatepickerConfig } from "ngx-bootstrap";
import { PaginatedResult } from "../../_models/pagination";
import { ExternalTasks } from "../../_models/externalTasks";

@Component({
  selector: "app-tech-fotiadis",
  templateUrl: "./tech-fotiadis.component.html",
  styleUrls: ["./tech-fotiadis.component.css"]
})
export class TechFotiadisComponent implements OnInit {
  tech = new ExternalTechs();
  tasks : Array<ExternalTasks>;
  user: User;
  showNewRow = false;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private techService: TechService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.data.subscribe(data => {
      this.user = data["agent"];
      this.tasks = data["task"].result;
    });
  }

  ngOnInit() {
    (this.bsConfig = {
      containerClass: "theme-red",
      dateInputFormat: 'DD/MM/YYYY'
    });

  }

  newTask() {
    this.showNewRow = true;
  }

  sortByDate() {
    this.techService.getTechTasks().subscribe(res =>{
      this.tasks = res.result;
    })
  }
  


  closeNewTask() {
    this.showNewRow = false;
    this.tech = new ExternalTechs();
  }

  createOrUpdate() {
    this.tech.id ? this.updateTask() : this.createTask();
  }

  createTask() {
    this.techService.createTaskOrder(this.tech).subscribe(res => {
      this.tasks.splice(0, 0, res);
      this.tech = new ExternalTechs();
    });
  }

  updateTask() {
    this.techService.updateTask(this.tech).subscribe(res => {
      this.toastr.success("H αλλαγή έγινε επιτυχώς");
      const i = this.tasks.findIndex(x => x.id === this.tech.id);
      this.tasks[i] = res;
      this.tech = new ExternalTechs();
    });
  }

  editTask(i: number) {
    this.showNewRow = true;
    this.deepCopy(i);
  }

  delete(id: number) {
    if (
      window.confirm("Είστε σίγουρος/η οτι θέλετε να διαγράψετε την εντολή;")
    ) {
      const i = this.tasks.findIndex(x => x.id === id);
      this.techService.deleteTask(id).subscribe(
        res => {
          if (res) {
            this.tasks.splice(i, 1);
          }
        },
        error => {
          this.toastr.error(error);
        }
      );
    }
  }

  deepCopy(i: number) {
    this.tech.area = this.tasks[i].area;
    this.tech.customerId = this.tasks[i].customerId;
    this.tech.damage = this.tasks[i].damage;
    this.tech.fullName = this.tasks[i].fullName;
    this.tech.date = this.tasks[i].date;
    this.tech.id = this.tasks[i].id;
    this.tech.model = this.tasks[i].model;
    this.tech.order = this.tasks[i].order;
    this.tech.origin = this.tasks[i].origin;
    this.tech.partsCost = this.tasks[i].partsCost;
    this.tech.serviceCost = this.tasks[i].serviceCost;
    this.tech.serviceDesc = this.tasks[i].serviceDesc;
    this.tech.totalCost = this.tasks[i].totalCost;
  }
}
