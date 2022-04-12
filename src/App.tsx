import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Web3ReactProvider } from '@web3-react/core'
import { Store } from '@/Store'
import {
  LayoutWrapper,
  DialogContainer,
  LoaderContainer,
  ModalContainer,
  NoticeContainer,
  WatcherContainer
} from '@/Components'
import { getLibrary } from '@/Utils'

import Home from '@/Pages/Home'
import Labs from '@/Pages/Labs'

export default function Application() {
  // __RENDER
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={Store}>
        <WatcherContainer />

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
    </Web3ReactProvider>
  )
}
