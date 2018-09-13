import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";

import { Observable, of, Subscription } from "rxjs";
import { Technician } from "../_models/technician";
import { AuthService } from "../_services/auth.service";
import { ToastrService } from "ngx-toastr";

import { Techs } from "../_services/techs.service";

@Component({
  selector: "tech-miele",
  templateUrl: "./tech-miele.component.html",
  styleUrls: ["./tech-miele.component.css"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", visibility: "hidden" })
      ),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class TechMieleComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  panelOpenState = false;
  filteredTechs: any[];
  display = false;
  technicians: Technician[];

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private techService: Techs
  ) {}

  filter(query: string) {
    this.filteredTechs = query
      ? this.technicians.filter(t =>
          t.areaService.toLowerCase().includes(query.toLowerCase())
        )
      : this.technicians;
  }

  ngOnInit() {
    this.display = true;
    this.getTechs();
  }

  getTechs() {
    this.techService
      .getTechs()
      .subscribe(techs => (this.filteredTechs = this.technicians = techs));
    this.display = false;
  }

  ngOnDestroy() {}
}
