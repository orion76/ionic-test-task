import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { IModel } from '../models/types';

@Injectable()
export class DataInterceptor implements HttpInterceptor {
  private jsonDataUrl = 'assets/products-data.json';


  constructor(private http: HttpClient,
              private store: Store<AppState>
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }


  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {

    const {url, method} = req;

    let id: number;
    // let ret: Observable<HttpEvent<any>> | null = null;
    let ret: any;

    const [section, modelType] = url.split('/').filter(Boolean);


    if (section === 'api') {
      switch (method) {
        case 'GET':
          id = this.getId(url);
          if (id) {
            ret = next.handle(this.replaceUrl(modelType, req)).pipe(
              map((response: HttpResponse<IModel[]>) => {
                return response.body.find((item) => item.id === id);
              })
            );
          } else {
            ret = next.handle(this.replaceUrl(modelType, req));
          }
          break;
        case 'POST':
          ret = this.store.pipe(
            // select(selectMaxId),
            // take(1),
            // map((last_id: number) => new HttpResponse({status: 200, body: {...req.body, id: ++last_id}})),
            // log('select(selectMaxId)'),
          );
          break;
        case 'PUT':
          ret = of(new HttpResponse({status: 200, body: {...req.body}}));
          break;
        case 'DELETE':
          id = this.getId(url);
          ret = of(new HttpResponse({status: 200, body: id}));
          break;
      }
    }
    if (!ret) {
      ret = next.handle(req);
    }
    return ret;
  }

  createJsonUrl(modelType: string) {
    return `assets/${modelType}-data.json`;
  }

  replaceUrl(modelType: string, req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({url: this.createJsonUrl(modelType)});
  }

  getId(url: any): number {
    return url.split('/')[3];
  }
}


