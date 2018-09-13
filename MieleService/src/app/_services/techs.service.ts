import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Technician } from "../_models/technician";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
  })
  export class Techs {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    
  createTech(technician: Technician) {
    return this.http.post(this.baseUrl + "techs/register", technician);
  }

  getTechs(): Observable<Array<Technician>> {
    return this.http.get<Array<Technician>>(this.baseUrl + "techs/techlist");
  }
  }