import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FinanceiroTestModule } from '../../../test.module';
import { MovimentacaoDetailComponent } from 'app/entities/movimentacao/movimentacao-detail.component';
import { Movimentacao } from 'app/shared/model/movimentacao.model';

describe('Component Tests', () => {
  describe('Movimentacao Management Detail Component', () => {
    let comp: MovimentacaoDetailComponent;
    let fixture: ComponentFixture<MovimentacaoDetailComponent>;
    const route = ({ data: of({ movimentacao: new Movimentacao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FinanceiroTestModule],
        declarations: [MovimentacaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MovimentacaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MovimentacaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load movimentacao on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.movimentacao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
