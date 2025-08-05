import { ActionReducer, MetaReducer } from '@ngrx/store';

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    const result = reducer(state, action);

    console.groupCollapsed(`${action.type}`);
    console.log('Previous State:', state);
    console.log('Action:', action);
    console.log('Next State:', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<any>[] = [logger];
