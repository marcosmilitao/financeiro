import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { SaldoService } from 'app/entities/saldo/saldo.service';
import { ISaldo, Saldo } from 'app/shared/model/saldo.model';

describe('Service Tests', () => {
  describe('Saldo Service', () => {
    let injector: TestBed;
    let service: SaldoService;
    let httpMock: HttpTestingController;
    let elemDefault: ISaldo;
    let expectedResult: ISaldo | ISaldo[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SaldoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Saldo(0, 0, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataAtualizacao: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Saldo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataAtualizacao: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataAtualizacao: currentDate,
          },
          returnedFromService
        );

        service.create(new Saldo()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Saldo', () => {
        const returnedFromService = Object.assign(
          {
            valor: 1,
            dataAtualizacao: currentDate.format(DATE_TIME_FORMAT),
            usuario: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataAtualizacao: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Saldo', () => {
        const returnedFromService = Object.assign(
          {
            valor: 1,
            dataAtualizacao: currentDate.format(DATE_TIME_FORMAT),
            usuario: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataAtualizacao: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Saldo', () => {
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
