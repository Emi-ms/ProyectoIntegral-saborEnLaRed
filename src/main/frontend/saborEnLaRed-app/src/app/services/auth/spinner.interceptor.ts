import { inject } from "@angular/core"
import { SpinnerService } from "../spinner.service";
import { finalize } from "rxjs/operators";
import { HttpInterceptorFn } from "@angular/common/http";

export const SpinnerInterceptor:HttpInterceptorFn = (req, next) =>{
    const spinner = inject(SpinnerService);

    spinner.show();
    return next(req).pipe(
        finalize(() => spinner.hide())
    )
}