import { Component, Inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IStoreItem } from '../../../../../models/types';
import { ENTITY_SELECT_SERVICE } from '../../../../../services/entity-select.service';
import { IEntitySelectService } from '../../../../../services/types';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducers';
import { PopoverController } from '@ionic/angular';
import { storeItemSelectors } from '../../../../../models/store-item/store/store-item.selectors';
import { map, take, withLatestFrom } from 'rxjs/operators';
import { createItem, storeItemActions } from '../../../../../models/store-item/store/store-item.actions';
import { StoreItemInfoComponent } from '../store-item-info/store-item-info.component';
import { POPOVER_MENU_SERVICE } from '../../../../../components/popover-menu/popover-menu.service';
import { IPopoverMenuService } from '../../../../../components/popover-menu/types';
import { IVolumeInfo } from '../../types';

@Component({
  selector: 'store-item-things',
  templateUrl: './store-item-things.component.html',
  styleUrls: ['./store-item-things.component.scss'],
})
export class StoreItemThingsComponent implements OnInit {


  entities$: Observable<IStoreItem[]>;
  entitiesCount$: Observable<number>;
  @Input() parent$: Observable<IStoreItem>;
  @Input() volume: IVolumeInfo;

  constructor(@Inject(ENTITY_SELECT_SERVICE) private selectService: IEntitySelectService,
              @Inject(POPOVER_MENU_SERVICE) private popoverMenu: IPopoverMenuService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private store: Store<AppState>,
              private popoverController: PopoverController) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id ? Number(this.activatedRoute.snapshot.params.id) : undefined;

    this.entities$ = this.store.select(storeItemSelectors.selectThingSibling(id));
    this.entitiesCount$ = this.entities$.pipe(
      map((entities) => entities.length),
    );
  }

  showMenu(entity: IStoreItem) {

    this.popoverMenu.show([
      {
        text: 'Info', command: () => {
          this.showInfo(entity);
        }
      },
      {
        text: 'Delete', command: () => {
          this.deleteItem(entity);
        }
      }
    ]);
  }

  showInfo(entity: IStoreItem) {
    this.popoverController.create({
      component: StoreItemInfoComponent,
      componentProps: {entity}
    }).then((popover) => popover.present());
  }

  async addThing() {
    const eventId = this.router.url;

    const {total, busy} = this.volume;

    const maxVolume = total !== undefined ? total - busy : undefined;
    this.router.navigate(['thing', 'select'], {queryParams: {eventId, maxVolume}}).then((success) => {
      if (!success) {
        return;
      }
      this.selectService.onSelect(eventId).pipe(
        withLatestFrom(this.parent$),
        take(1)
      ).subscribe(([event, parent]) => {
        const entity: IStoreItem = {type: 'store-item', name: event.entity.name, item: event.entity, parent};
        this.store.dispatch(createItem({entity}));
      });
    });
  }
  deleteItem(entity: IStoreItem) {
    const id = entity.id;
    this.store.dispatch(storeItemActions.deleteItem({id}));
  }
}
