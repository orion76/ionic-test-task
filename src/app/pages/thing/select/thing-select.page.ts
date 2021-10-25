import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IModel, IThingModel } from '../../../models/types';
import { ENTITY_SELECT_SERVICE } from '../../../services/entity-select.service';
import { IEntitySelectService } from '../../../services/types';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import { thingSelectors } from '../../../models/thing/store/thing.selectors';
import { map } from 'rxjs/operators';


@Component({
  selector: 'thing-select',
  templateUrl: './thing-select.page.html',
  styleUrls: ['./thing-select.page.scss'],
})
export class ThingSelectPage implements OnInit {

  eventId: string;
  maxVolume: number;
  entities$: Observable<IThingModel[]>;
  entitiesCount$: Observable<number>;
  constructor(@Inject(ENTITY_SELECT_SERVICE) private selectService: IEntitySelectService,
              private navController: NavController,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private store: Store<AppState>
  ) {
    const {eventId, maxVolume} = this.activatedRoute.snapshot.queryParams;
    this.eventId = eventId;
    if (maxVolume) {
      this.maxVolume = maxVolume;
    }
  }


  select(entity: IModel) {
    if (this.eventId) {
      this.selectService.select(this.eventId, entity);
    }
    this.eventId = null;
    this.navController.back();
  }

  ngOnInit() {
    console.log('11111111111111',this.maxVolume);
    this.entities$ = this.store.select(thingSelectors.selectByVolume(this.maxVolume));
    this.entitiesCount$ = this.entities$.pipe(
      map((entities) => entities.length),
    );
  }

}
