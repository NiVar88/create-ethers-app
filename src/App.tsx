import { Suspense, lazy } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Routes, Route, useLocation, useSearchParams } from 'react-router-dom'
import { DialogContainer, LayoutWrapper, ModalContainer, NoticeContainer } from '@/components'
import { useEagerConnect, useInactiveListener } from '@/hooks'
import { userSelector } from '@/store'
import Home from '@/pages/Home'
import Guard from '@/pages/Guard'

const Info = lazy(() => import('./pages/Info'))
const Labs = lazy(() => import('./pages/Labs'))

export default function Application() {
  // __STATE <React.Hooks>
  useEagerConnect()
  useInactiveListener()

  // __EFFECTS <React.Hooks>
  // useEffect(() => {}, [])

  // __RENDER
  return (
    <BrowserRouter>
      <DialogContainer />
      <ModalContainer />
      <NoticeContainer />

      <Routes>
        <Route path='/' element={<LayoutWrapper />}>
          <Route index element={<Home />} />

          <Route
            caseSensitive
            path='info'
            element={
              <RouteGuard>
                <Info />
              </RouteGuard>
            }
          />

          <Route
            caseSensitive
            path='labs'
            element={
              <Suspense fallback={null}>
                <Labs />
              </Suspense>
            }
          />

          <Route
            caseSensitive
            path='guard'
            element={
              <RouteGuard isGuard isLazy={false}>
                <Guard />
              </RouteGuard>
            }
          />

          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export function RouteGuard({ children: Component, isLazy = true, isGuard }: GuardProps) {
  // __STATE <React.Hooks>
  const isAuthenticated = useSelector(userSelector.getAuthenticated)
  const { pathname } = useLocation()
  const [query] = useSearchParams()

  // __RENDER
  if (isAuthenticated) {
    if (isGuard) {
      const fallback = query.get('fallback')
      return <Navigate to={fallback ? `/${fallback}` : '/'} replace />
    } else {
      return isLazy ? <Suspense fallback={<i>&nbsp;</i>} children={Component} /> : Component
    }
  } else {
    if (isGuard) {
      return Component
    } else {
      return <Navigate to={`/guard?fallback=${pathname.slice(1)}`} state={{ from: pathname }} replace />
    }
  }
}

export interface GuardProps {
  children: JSX.Element
  isLazy?: boolean
  isGuard?: boolean
}
