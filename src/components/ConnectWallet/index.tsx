import { useMemo } from 'react'
import { Wallets } from '@/constants'
import { useAuth } from '@/hooks'
import cls from 'classnames'

export function ConnectWallet() {
  // __STATE <React.Hooks>
  const wallets = useMemo(() => Wallets, [])
  const { signin } = useAuth()

  // __RENDER
  return (
    <div className='ui--connect-wallet'>
      <ul className='ui--connect-wallet-group'>
        {wallets.map((record, index) => (
          <li className={cls('ui--connect-wallet-list', { recommended: record.recommended })} key={index}>
            <button className='btn btn-wallet' onClick={() => signin(record.connector)}>
              <img className='icon' src={`/static/images/wallets/${record.icon}`} />
              <div className='text'>
                <h4 className='h4'>{record.name}</h4>
                <h6 className='h6'>{record.description}</h6>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <div className='ui--connect-wallet-footer'>
        <a
          className='btn btn-text btn-guide'
          href='https://docs.pancakeswap.finance/get-started/connection-guide'
          rel='noreferrer noopener'
          target='_blank'
        >
          <span className='icon bi bi-info-circle'></span>
          <span className='text'>Learn how to connect</span>
        </a>
      </div>
    </div>
  )
}
