import { Injectable } from "@angular/core";
import { ExternalTechs } from "../_models/externalTechs";
import { ToastrService } from "ngx-toastr";
import { ActivatedRouteSnapshot, Router, Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { TechMak } from "../_services/techMak.service";

@Injectable()
export class TaskMakResolver implements Resolve<ExternalTechs[]> {
  pageNumber = 1;
  pageSize = 8;

  constructor(
    private techMak: TechMak,
    private router: Router,
    private toastr: ToastrService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ExternalTechs[]> {
      return this.techMak.getTechTasks(this.pageNumber, this.pageSize).pipe(
          catchError(error => {
              this.toastr.error('Κάτι πήγε στραβά');
              this.router.navigate(['/home']);
              return of(null);
          })
      )
  }
}
