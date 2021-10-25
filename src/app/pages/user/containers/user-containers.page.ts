import { Component, Inject, OnInit } from '@angular/core';
import { IContainerModel, IStoreItem, IStoreItemContainer } from '../../../models/types';
import { Observable } from 'rxjs';
import { ENTITY_SELECT_SERVICE } from '../../../services/entity-select.service';
import { IEntitySelectService } from '../../../services/types';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import { selectStoreItem, storeItemSelectors } from '../../../models/store-item/store/store-item.selectors';
import { IVolumeInfo } from './types';
import { Md5 } from 'ts-md5';


@Component({
  selector: 'user-containers',
  templateUrl: './user-containers.page.html',
  styleUrls: ['./user-containers.page.scss'],
})
export class UserContainersPage implements OnInit {
  parent$: Observable<IStoreItem>;
  parentId: number;
  // volume$: Observable<IVolumeInfo>;
  volume$: Observable<IVolumeInfo>;

  /*
  * @TODO Убрать лишние зависимости (роуты )
  */
  constructor(@Inject(ENTITY_SELECT_SERVICE) private selectService: IEntitySelectService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private store: Store<AppState>,
  ) {
  }

  ngOnInit() {
    const {id} = this.activatedRoute.snapshot.params;
    this.parent$ = this.store.select(selectStoreItem(id));
    this.volume$ = this.parent$.pipe(
      switchMap((parent: IStoreItemContainer) => {
        const total = parent?.item.volume;
        return this.store.select(storeItemSelectors.selectBusyVolume(parent?.id)).pipe(
          map((busy) => ({total, busy}))
        );
      }),
    );


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
}
