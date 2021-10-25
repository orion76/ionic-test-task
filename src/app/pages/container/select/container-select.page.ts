import { Component, Inject, OnInit } from '@angular/core';
import { ENTITY_SELECT_SERVICE } from '../../../services/entity-select.service';
import { IEntitySelectService } from '../../../services/types';
import { ActivatedRoute, Router } from '@angular/router';
import { IContainerModel, IModel } from '../../../models/types';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/reducers';
import { Store } from '@ngrx/store';
import { containerSelectors } from '../../../models/container/store/container.selectors';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'container-select',
  templateUrl: './container-select.page.html',
  styleUrls: ['./container-select.page.scss'],
})
export class ContainerSelectPage implements OnInit {
  eventId: string;
  maxVolume: number;
  entities$: Observable<IContainerModel[]>;
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
    this.entities$ = this.store.select(containerSelectors.selectByVolume(this.maxVolume));
    this.entitiesCount$ = this.entities$.pipe(
      map((entities) => entities.length),
    );
  }

}
