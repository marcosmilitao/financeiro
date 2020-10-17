import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FinanceiroTestModule } from '../../../test.module';
import { MovimentacaoComponent } from 'app/entities/movimentacao/movimentacao.component';
import { MovimentacaoService } from 'app/entities/movimentacao/movimentacao.service';
import { Movimentacao } from 'app/shared/model/movimentacao.model';

describe('Component Tests', () => {
  describe('Movimentacao Management Component', () => {
    let comp: MovimentacaoComponent;
    let fixture: ComponentFixture<MovimentacaoComponent>;
    let service: MovimentacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FinanceiroTestModule],
        declarations: [MovimentacaoComponent],
      })
        .overrideTemplate(MovimentacaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MovimentacaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MovimentacaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Movimentacao(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.movimentacaos && comp.movimentacaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
