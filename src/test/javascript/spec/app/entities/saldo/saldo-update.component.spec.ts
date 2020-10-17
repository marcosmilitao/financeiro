import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FinanceiroTestModule } from '../../../test.module';
import { SaldoUpdateComponent } from 'app/entities/saldo/saldo-update.component';
import { SaldoService } from 'app/entities/saldo/saldo.service';
import { Saldo } from 'app/shared/model/saldo.model';

describe('Component Tests', () => {
  describe('Saldo Management Update Component', () => {
    let comp: SaldoUpdateComponent;
    let fixture: ComponentFixture<SaldoUpdateComponent>;
    let service: SaldoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FinanceiroTestModule],
        declarations: [SaldoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SaldoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SaldoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SaldoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Saldo(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Saldo();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
