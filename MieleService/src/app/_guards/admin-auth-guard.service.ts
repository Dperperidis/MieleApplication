import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../_services/auth.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(): boolean {
    if (this.authService.isAdmin) {
      return true;
    } else {
      this.toastr.error("Δεν έχετε δικαιώματα για να εισέλθετε");
      this.router.navigate(["/home"]);
      return false;
    }
  }
}
