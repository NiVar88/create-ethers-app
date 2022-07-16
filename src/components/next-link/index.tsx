import { useRouter } from 'next/router'
import { useMemo, useCallback, ReactNode, MouseEvent } from 'react'
import cls from 'classnames'

export interface Props {
  children: ReactNode
  className?: string
  activeClass?: string
  useLink?: boolean
  onClick?: () => void

  /**
   * Specifies the URL of the page the link goes to
   */
  href: string

  /**
   * Specifies where to open the linked document
   */
  target?: '_blank' | '_parent' | '_self' | '_top'

  /**
   * Specifies the relationship between the current document and the linked document
   */
  rel?:
    | 'alternate'
    | 'author'
    | 'bookmark'
    | 'external'
    | 'help'
    | 'license'
    | 'next'
    | 'nofollow'
    | 'noreferrer'
    | 'noopener'
    | 'prev'
    | 'search'
    | 'tag'

  /**
   * Specifies which referrer information to send with the link
   */
  referrerPolicy?:
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
}

export function NextLink({ children, href, onClick, ...props }: Props) {
  // __STATE <React.Hooks>
  const router = useRouter()
  const className = useMemo(() => {
    const isActive = [router.pathname, router.asPath].indexOf(href) > -1
    return cls(props.className, 'router-link', {
      'router-link-active': isActive,
      [props.activeClass || '']: isActive
    })
  }, [router, href, props])

  // __FUNCTIONS
  const handleRouterLink = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      router.push(href)

      if (onClick) onClick()
    },
    [href]
  )

  // __RENDER
  if (props.useLink) {
    return (
      <a className={className} href={href} target={props.target} rel={props.rel} referrerPolicy={props.referrerPolicy}>
        {children}
      </a>
    )
  } else {
    return (
      <a className={className} href={href} onClick={handleRouterLink}>
        {children}
      </a>
    )
  }
}
