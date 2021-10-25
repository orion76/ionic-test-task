import { NgModule } from '@angular/core';
import { FaIconPipe } from './fa-icon.pipe';
import { IsUndefinedPipe } from './is-undefined.pipe';

@NgModule({
  imports: [],
  exports: [
    FaIconPipe,
    IsUndefinedPipe,
  ],
  declarations: [
    FaIconPipe,
    IsUndefinedPipe,
  ],
  providers: [],
})
export class PipesModule {
}
