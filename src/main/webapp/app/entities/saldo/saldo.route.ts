import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISaldo, Saldo } from 'app/shared/model/saldo.model';
import { SaldoService } from './saldo.service';
import { SaldoComponent } from './saldo.component';
import { SaldoDetailComponent } from './saldo-detail.component';
import { SaldoUpdateComponent } from './saldo-update.component';

@Injectable({ providedIn: 'root' })
export class SaldoResolve implements Resolve<ISaldo> {
  constructor(private service: SaldoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISaldo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((saldo: HttpResponse<Saldo>) => {
          if (saldo.body) {
            return of(saldo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Saldo());
  }
}

export const saldoRoute: Routes = [
  {
    path: '',
    component: SaldoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'financeiroApp.saldo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SaldoDetailComponent,
    resolve: {
      saldo: SaldoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'financeiroApp.saldo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SaldoUpdateComponent,
    resolve: {
      saldo: SaldoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'financeiroApp.saldo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SaldoUpdateComponent,
    resolve: {
      saldo: SaldoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'financeiroApp.saldo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
