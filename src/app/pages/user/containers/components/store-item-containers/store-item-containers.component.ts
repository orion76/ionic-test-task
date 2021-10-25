import { Component, Inject, Input, OnInit } from '@angular/core';
import { IContainerModel, IStoreItem, IStoreItemContainer } from '../../../../../models/types';
import { Observable } from 'rxjs';
import { map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { createItem, storeItemActions } from '../../../../../models/store-item/store/store-item.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { ENTITY_SELECT_SERVICE } from '../../../../../services/entity-select.service';
import { IEntitySelectService } from '../../../../../services/types';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducers';
import { selectContainerSibling, storeItemSelectors } from '../../../../../models/store-item/store/store-item.selectors';
import { fromPromise } from 'rxjs/internal-compatibility';
import { StoreItemInfoComponent } from '../store-item-info/store-item-info.component';
import { PopoverController } from '@ionic/angular';
import { POPOVER_MENU_SERVICE } from '../../../../../components/popover-menu/popover-menu.service';
import { IPopoverMenuService } from '../../../../../components/popover-menu/types';
import { IVolumeInfo } from '../../types';

@Component({
  selector: 'store-item-containers',
  templateUrl: './store-item-containers.component.html',
  styleUrls: ['./store-item-containers.component.scss'],
})
export class StoreItemContainersComponent implements OnInit {

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

    this.entities$ = this.store.select(selectContainerSibling(id));
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

  deleteItem(entity: IStoreItem) {
    const id = entity.id;
    this.store.dispatch(storeItemActions.deleteItem({id}));
  }

  openContainer(parent: IContainerModel) {

    const path: string[] = ['user', 'containers'];
    if (parent) {
      path.push(String(parent.id));
    }

    this.router.navigate(path).then((success) => {
      if (!success) {
        return;
      }
    });
  }

  addContainer() {
    const eventId = this.router.url;
    console.log('volume', this.volume);

    const {total, busy} = this.volume;

    const maxVolume = total !== undefined ? total - busy : undefined;
    this.router.navigate(['container', 'select'], {queryParams: {eventId, maxVolume}}).then((success) => {
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

  showInfo(entity: IStoreItem) {
    this.store.select(storeItemSelectors.selectContainerSibling(entity.id)).pipe(
      map((sibling) => sibling.reduce((acc: number, item: IStoreItemContainer) => acc + item.item.volume, 0)),
      switchMap((busyVolume) => {
        return fromPromise(this.popoverController.create({
          component: StoreItemInfoComponent,
          componentProps: {entity, busyVolume}
        }));
      }),
      take(1)
    ).subscribe((popover) => popover.present());
  }

}
