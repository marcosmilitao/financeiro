import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FinanceiroTestModule } from '../../../test.module';
import { MovimentacaoUpdateComponent } from 'app/entities/movimentacao/movimentacao-update.component';
import { MovimentacaoService } from 'app/entities/movimentacao/movimentacao.service';
import { Movimentacao } from 'app/shared/model/movimentacao.model';

describe('Component Tests', () => {
  describe('Movimentacao Management Update Component', () => {
    let comp: MovimentacaoUpdateComponent;
    let fixture: ComponentFixture<MovimentacaoUpdateComponent>;
    let service: MovimentacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FinanceiroTestModule],
        declarations: [MovimentacaoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MovimentacaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MovimentacaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MovimentacaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Movimentacao(123);
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
        const entity = new Movimentacao();
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
