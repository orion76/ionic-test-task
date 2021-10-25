import { Observable } from 'rxjs';
import { IModel } from '../models/types';

export interface IEntitySelectService {
  onSelect(eventId: string): Observable<IEntitySelectEvent>;

  select(eventId: string, entity: IModel);
}

export interface IEntitySelectEvent {
  eventId: string;
  entity: IModel;
}
