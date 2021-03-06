import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

import { Technician } from "../_models/technician";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ExternalTechs } from "../_models/externalTechs";
import { PaginatedResult } from "../_models/pagination";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TechFot {
  baseUrl = environment.apiUrl + "techfot/";

  constructor(private http: HttpClient) {}


  createTaskOrder(techs: ExternalTechs): Observable<ExternalTechs> {
    return this.http.post<ExternalTechs>(this.baseUrl + "externalOrderFot", techs);
  }

  getTechTasks(page?, itemsPerPage?): Observable<PaginatedResult<ExternalTechs[]>> {
    const paginatedResult: PaginatedResult<Array<ExternalTechs>> = new PaginatedResult<Array<ExternalTechs>>();

    let params = new HttpParams()

    if (page !=null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Array<ExternalTechs>>(this.baseUrl + "getTasksFot", {observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if(response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
        }
        return paginatedResult;
      })
    )
  }

  getTechTask(id: number) :Observable<ExternalTechs> {
    return this.http.get<ExternalTechs>(this.baseUrl + "fot/" + id)
  }

  updateTask(techs: ExternalTechs) : Observable<ExternalTechs> {
    return this.http.post<ExternalTechs>(this.baseUrl + "update/fot", techs);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.post(this.baseUrl + 'delete/fot/' + id, {})
  }
}
