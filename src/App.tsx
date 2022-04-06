import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Store } from '@/Collects'
import { LayoutWrapper, DialogContainer, LoaderContainer, ModalContainer, NoticeContainer } from '@/Components'

import Home from '@/Pages/Home'
import Labs from '@/Pages/Labs'

export default function Application() {
  // __RENDER
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayoutWrapper />}>
            <Route index element={<Home />} />

            <Route path='/Labs' caseSensitive element={<Labs />} />

            <Route path='*' element={<Navigate to='/' />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <DialogContainer />
      <ModalContainer />
      <NoticeContainer />
      <LoaderContainer />
    </Provider>
  )
}
