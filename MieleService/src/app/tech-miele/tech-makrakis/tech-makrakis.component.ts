import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { User } from "../../_models/user";

import { ExternalTechs } from "../../_models/externalTechs";
import { ToastrService } from "ngx-toastr";
import { BsDatepickerConfig } from "ngx-bootstrap";
import { PaginatedResult, Pagination } from "../../_models/pagination";
import { ExternalTasks } from "../../_models/externalTasks";
import { TechMak } from "../../_services/techMak.service";
@Component({
  selector: 'app-tech-makrakis',
  templateUrl: './tech-makrakis.component.html',
  styleUrls: ['./tech-makrakis.component.css']
})
export class TechMakrakisComponent implements OnInit {

  tech = new ExternalTechs();
  tasks: Array<ExternalTasks>;
  user: User;
  showNewRow = false;
  bsConfig: Partial<BsDatepickerConfig>;
  pagination: Pagination;

  bsDate= new Date();

  constructor(
    private techMak: TechMak,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.data.subscribe(data => {
      this.user = data["agent"];
      this.tasks = data["taskMak"].result;
      this.pagination = data["taskMak"].pagination;

    });
  }

  ngOnInit() {
    this.bsConfig = {
      minDate: new Date(),
      containerClass: "theme-red",
      dateInputFormat: "DD/MM/YYYY",
      showWeekNumbers: false
    };
  }

  newTask() {
    this.showNewRow = true;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getPagiTasks();
  }

  getPagiTasks() {
    this.techMak
      .getTechTasks(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (res: PaginatedResult<ExternalTasks[]>) => {
          this.tasks = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.toastr.error(error);
        }
      );
  }

  closeNewTask() {
    this.showNewRow = false;
    this.tech = new ExternalTechs();
  }

  createOrUpdate() {
    this.tech.id ? this.updateTask() : this.createTask();
  }



  createTask() {
    this.techMak.createTaskOrder(this.tech).subscribe(res => {
      this.tasks.splice(0, 0, res);
      this.tech = new ExternalTechs();
    });
  }

  updateTask() {
    this.techMak.updateTask(this.tech).subscribe(res => {
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
      this.techMak.deleteTask(id).subscribe(
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
    this.tech.status = this.tasks[i].status;
  }

}
