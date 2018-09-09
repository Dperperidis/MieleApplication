import { Injectable } from "@angular/core";
import { ExternalTechs } from "../_models/externalTechs";
import { TechService } from "../_services/tech.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRouteSnapshot, Router, Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class TaskResolver implements Resolve<ExternalTechs[]> {
  pageNumber = 1;
  pageSize = 5;

  constructor(
    private techService: TechService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ExternalTechs[]> {
      return this.techService.getTechTasks(this.pageNumber, this.pageSize).pipe(
          catchError(error => {
              this.toastr.error('Κάτι πήγε στραβά');
              this.router.navigate(['/home']);
              return of(null);
          })
      )
  }
}
