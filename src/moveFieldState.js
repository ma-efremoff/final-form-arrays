// @flow
import type { MutableState } from 'final-form'

function moveFieldState(
  state: MutableState<any>,
  source: Object,
  destKey: string,
  oldState: MutableState<any> = state
) {
  delete state.fields[source.name]
  state.fields[destKey] = {
    ...source,
    name: destKey,
    // prevent functions from being overwritten
    // if the state.fields[destKey] does not exist, it will be created
    // when that field gets registered, with its own change/blur/focus callbacks
    change: oldState.fields[destKey] && oldState.fields[destKey].change,
    blur: oldState.fields[destKey] && oldState.fields[destKey].blur,
    focus: oldState.fields[destKey] && oldState.fields[destKey].focus,
    lastFieldState: undefined // clearing lastFieldState forces renotification
  }

  const field = state.fields[key];
  if (!field.change || !field.blur || !field.focus) {
    // If at least one of callbacks is not defined,
    // then probably state.fields[key] is not exist,
    // so we remove the field to allow its reinitialization at
    // the moment of registration
    delete state.fields[key];
  }
}

export default moveFieldState
