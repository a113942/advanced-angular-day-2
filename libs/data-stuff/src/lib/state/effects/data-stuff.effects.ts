import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs';
import { selectCustomersNeedLoaded } from '..';
import { CustomerCommands } from '../actions/customer.actions';
// prettier-ignore
@Injectable()
export class DataStuffEffects {
  loadCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigationAction),
      tap(() => console.log('Got a navigation')),
      concatLatestFrom(() => this.store.select(selectCustomersNeedLoaded)),
      map(
        ([,result,]) => result,
      ),
      filter((needsLoaded) => needsLoaded), // if false, stop here..
      map(() => CustomerCommands.load()), // time to make the donuts.
    );
  });



 constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
  ) {}
}
