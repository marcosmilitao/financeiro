import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FinanceiroTestModule } from '../../../test.module';
import { SaldoComponent } from 'app/entities/saldo/saldo.component';
import { SaldoService } from 'app/entities/saldo/saldo.service';
import { Saldo } from 'app/shared/model/saldo.model';

describe('Component Tests', () => {
  describe('Saldo Management Component', () => {
    let comp: SaldoComponent;
    let fixture: ComponentFixture<SaldoComponent>;
    let service: SaldoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FinanceiroTestModule],
        declarations: [SaldoComponent],
      })
        .overrideTemplate(SaldoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SaldoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SaldoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Saldo(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.saldos && comp.saldos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
