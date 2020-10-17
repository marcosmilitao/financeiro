import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FinanceiroTestModule } from '../../../test.module';
import { SaldoDetailComponent } from 'app/entities/saldo/saldo-detail.component';
import { Saldo } from 'app/shared/model/saldo.model';

describe('Component Tests', () => {
  describe('Saldo Management Detail Component', () => {
    let comp: SaldoDetailComponent;
    let fixture: ComponentFixture<SaldoDetailComponent>;
    const route = ({ data: of({ saldo: new Saldo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FinanceiroTestModule],
        declarations: [SaldoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SaldoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SaldoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load saldo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.saldo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
