import { Injectable, InjectionToken } from '@angular/core';
import { IEntitySelectEvent, IEntitySelectService } from './types';
import { Observable, Subject } from 'rxjs';
import { IModel } from '../models/types';
import { filter } from 'rxjs/operators';

export const ENTITY_SELECT_SERVICE = new InjectionToken<IEntitySelectService>('ENTITY_SELECT_SERVICE');


@Injectable()
export class EntitySelectService implements IEntitySelectService {

  selected = new Subject<IEntitySelectEvent>();

  onSelect(eventId: string): Observable<IEntitySelectEvent> {
    return this.selected.asObservable().pipe(filter((event) => event.eventId === eventId));
  }

  select(eventId: string, entity: IModel) {
    this.selected.next({eventId, entity});
  }
}
