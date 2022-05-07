import { createReducer } from '@reduxjs/toolkit'
import { setLanguage, setTheme, setLoader, setDialog, setModal, setNotice } from './app.actions'
import { initialState } from './app.state'

export default createReducer(initialState, (builder) => {
  const regex = /^rm:|remove:/gi

  return builder
    .addCase(setLanguage, (state, { payload }) => {
      state.lang = payload
    })

    .addCase(setTheme, (state, { payload }) => {
      state.theme = payload
    })

    .addCase(setLoader, (state, { payload }) => {
      state.loader = payload
    })

    .addCase(setDialog, (state, { payload }) => {
      state.dialog = {
        ...payload,
        type: payload?.type || 'alert',
        confirmLabel: payload?.confirmLabel || 'OK',
        cancelLabel: payload?.cancelLabel || 'Cancel',
        resolve: payload?.resolve
      }
    })

    .addCase(setModal, (state, { payload }) => {
      const { vid } = payload
      if (regex.test(vid)) {
        const _vid = vid.replace(regex, '').trim()
        state.modal = state.modal.remove('vid', _vid)
      } else {
        if (!payload.visible) {
          state.modal = state.modal.map((record) => {
            if (record.vid === vid) record.visible = payload.visible
            return record
          })
        } else {
          state.modal = [...state.modal, payload]
        }
      }
    })

    .addCase(setNotice, (state, { payload }) => {
      if (payload) {
        const { vid } = payload
        if (regex.test(vid!)) {
          const _vid = vid!.replace(regex, '').trim()
          state.notice = state.notice.remove('vid', _vid)
        } else {
          state.notice = [...state.notice, payload]
        }
      } else {
        state.notice = []
      }
    })
})
