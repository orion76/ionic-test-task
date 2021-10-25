import { Component, Input, OnInit } from '@angular/core';
import { IBreadcrumbItem, IStoreItem } from '../../../../../models/types';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducers';
import { Router } from '@angular/router';
import { storeItemSelectors } from '../../../../../models/store-item/store/store-item.selectors';

@Component({
  selector: 'store-item-breadcrumb',
  templateUrl: './store-item-breadcrumb.component.html',
  styleUrls: ['./store-item-breadcrumb.component.scss'],
})
export class StoreItemBreadcrumbComponent implements OnInit {

  @Input() current: IStoreItem;
  entities$: Observable<IBreadcrumbItem[]>;

  constructor(private store: Store<AppState>,
              private router: Router) {
  }

  ngOnInit() {
    this.entities$ = this.store.select(storeItemSelectors.selectPath(this.current.id));
  }

  openContainer(id?: number) {
    const path: (string | number)[] = ['user', 'containers'];
    if (id) {
      path.push(id);
    }
    this.router.navigate(path);
  }

}
