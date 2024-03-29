import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { MovimentacaoService } from 'app/entities/movimentacao/movimentacao.service';
import { IMovimentacao, Movimentacao } from 'app/shared/model/movimentacao.model';
import { TipoMovimento } from 'app/shared/model/enumerations/tipo-movimento.model';

describe('Service Tests', () => {
  describe('Movimentacao Service', () => {
    let injector: TestBed;
    let service: MovimentacaoService;
    let httpMock: HttpTestingController;
    let elemDefault: IMovimentacao;
    let expectedResult: IMovimentacao | IMovimentacao[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(MovimentacaoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Movimentacao(0, 0, currentDate, TipoMovimento.ENTRADA, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            data: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Movimentacao', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            data: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            data: currentDate,
          },
          returnedFromService
        );

        service.create(new Movimentacao()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Movimentacao', () => {
        const returnedFromService = Object.assign(
          {
            valor: 1,
            data: currentDate.format(DATE_TIME_FORMAT),
            tipoMovimento: 'BBBBBB',
            usuario: 'BBBBBB',
            descricao: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            data: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Movimentacao', () => {
        const returnedFromService = Object.assign(
          {
            valor: 1,
            data: currentDate.format(DATE_TIME_FORMAT),
            tipoMovimento: 'BBBBBB',
            usuario: 'BBBBBB',
            descricao: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            data: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Movimentacao', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
