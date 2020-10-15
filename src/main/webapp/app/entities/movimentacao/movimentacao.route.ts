import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMovimentacao, Movimentacao } from 'app/shared/model/movimentacao.model';
import { MovimentacaoService } from './movimentacao.service';
import { MovimentacaoComponent } from './movimentacao.component';
import { MovimentacaoDetailComponent } from './movimentacao-detail.component';
import { MovimentacaoUpdateComponent } from './movimentacao-update.component';

@Injectable({ providedIn: 'root' })
export class MovimentacaoResolve implements Resolve<IMovimentacao> {
  constructor(private service: MovimentacaoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMovimentacao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((movimentacao: HttpResponse<Movimentacao>) => {
          if (movimentacao.body) {
            return of(movimentacao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Movimentacao());
  }
}

export const movimentacaoRoute: Routes = [
  {
    path: '',
    component: MovimentacaoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'financeiroApp.movimentacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MovimentacaoDetailComponent,
    resolve: {
      movimentacao: MovimentacaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'financeiroApp.movimentacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MovimentacaoUpdateComponent,
    resolve: {
      movimentacao: MovimentacaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'financeiroApp.movimentacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MovimentacaoUpdateComponent,
    resolve: {
      movimentacao: MovimentacaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'financeiroApp.movimentacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
