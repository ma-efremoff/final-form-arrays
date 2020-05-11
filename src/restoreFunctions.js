// @flow
import type { MutableState } from 'final-form'

function restoreFunctions(
  state: MutableState<any>,
  backupState: MutableState<any>
) {
  Object.keys(state.fields).forEach(key => {
    state.fields[key] = {
      ...state.fields[key],
      change: state.fields[key].change || (backupState.fields[key] && backupState.fields[key].change),
      blur: state.fields[key].blur || (backupState.fields[key] && backupState.fields[key].blur),
      focus: state.fields[key].focus || (backupState.fields[key] && backupState.fields[key].focus)
    }

    const field = state.fields[key];
    if (!field.change || !field.blur || !field.focus) {
      // If at least one of callbacks is not defined,
      // then probably state.fields[key] is not exist,
      // so we remove the field to allow its reinitialization at
      // the moment of registration
      // (see comments from moveFieldState.js)
      delete state.fields[key];
    }
  })
}
export default restoreFunctions
