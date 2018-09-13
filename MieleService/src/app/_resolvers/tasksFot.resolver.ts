import { Injectable } from "@angular/core";
import { ExternalTechs } from "../_models/externalTechs";
import { TechFot } from "../_services/techFot.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRouteSnapshot, Router, Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class TaskFotResolver implements Resolve<ExternalTechs[]> {
  pageNumber = 1;
  pageSize = 8;

  constructor(
    private techFot: TechFot,
    private router: Router,
    private toastr: ToastrService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ExternalTechs[]> {
      return this.techFot.getTechTasks(this.pageNumber, this.pageSize).pipe(
          catchError(error => {
              this.toastr.error('Κάτι πήγε στραβά');
              this.router.navigate(['/home']);
              return of(null);
          })
      )
  }
}
