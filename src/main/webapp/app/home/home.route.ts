import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { HomeComponent } from './home.component';
import { DebitoComponent } from './debito/debito.component';
import { CreditoComponent } from './credito/credito.component';
import { MovimentacaoComponent } from './movimentacao/movimentacao.component';
import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICliente, Cliente } from 'app/shared/model/cliente.model';
import { HomeService } from './home.service';

@Injectable({ providedIn: 'root' })
export class ClienteResolve implements Resolve<ICliente> {
  constructor(private service: HomeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICliente> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cliente: HttpResponse<Cliente>) => {
          if (cliente.body) {
            return of(cliente.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Cliente());
  }
}

export const HOME_ROUTE: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      authorities: [],
      pageTitle: 'home.title',
    },
  },
  {
    path: ':id/debito',
    component: DebitoComponent,
    resolve: {
      cliente: ClienteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'financeiroApp.cliente.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/credito',
    component: CreditoComponent,
    resolve: {
      cliente: ClienteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'financeiroApp.cliente.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/movimentacao',
    component: MovimentacaoComponent,
    resolve: {
      cliente: ClienteResolve,
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'financeiroApp.cliente.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
