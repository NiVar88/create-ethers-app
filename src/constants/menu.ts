interface Menu {
  id: any
  to: string
  label: string
  end?: boolean
  enable?: boolean
}

export const Menu: Menu[] = [
  {
    id: '.home',
    to: '/',
    label: 'Home',
    end: true,
    enable: true
  },
  {
    id: '.info',
    to: '/info',
    label: 'Info',
    end: true,
    enable: true
  },
  {
    id: '.labs',
    to: '/labs',
    label: 'Labs',
    end: true,
    enable: true
  }
]
