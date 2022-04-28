import { useMemo } from 'react'
import { ModalComponent } from '@/Components'
import { Wallets } from '@/Constants'
import { useWalletConnection } from '@/Hooks'

export function ConnectWallet() {
  // __STATE <React.Hooks>
  const { connect } = useWalletConnection()
  const wallets = useMemo(() => Wallets, [])

  // __RENDER
  return (
    <ModalComponent title='Connect Your Wallet'>
      <div className='ui--connect-wallet'>
        <ul className='ui--connect-wallet-group'>
          {wallets.map((record, index) => (
            <li className='ui--connect-wallet-list' key={index}>
              <button className='btn btn-wallet' onClick={() => connect(record.connector)}>
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
    </ModalComponent>
  )
}
