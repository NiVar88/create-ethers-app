import { useRef } from 'react'
import { Wallets } from '@/constants'
import { useNodeFocus, useWalletConnection } from '@/hooks'
import { modal } from '@/utils'

export function ConnectWallet() {
  // __STATE <React.Hooks>
  const nodeRef = useRef<HTMLButtonElement>(null)
  const { connect } = useWalletConnection()

  // __EFFECTS
  useNodeFocus(nodeRef)

  // __RENDER
  return (
    <div className='ui--connect-wallet'>
      <div className='ui--connect-wallet-header'>
        <h2 className='title'>Connect Wallet</h2>
        <p className='desc'>Start your journey with Game Items on blockchain</p>
      </div>

      <ul className='ui--connect-wallet-group'>
        {Wallets.map((record, index) => (
          <li className='ui--connect-wallet-list' key={index}>
            <button className='btn btn-wallet' onClick={() => connect(record.connector)}>
              <img className='icon' src={`/static/images/wallets/${record.icon}`} />
              <div className='text'>
                <p className='name'>Sign-in with {record.name}</p>
                <p className='desc'>{record.description}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <div className='ui--connect-wallet-footer'>
        <button className='btn btn-close' ref={nodeRef} onClick={() => modal.off('sign-in')}>
          <span className='text'>close [ESC]</span>
        </button>
      </div>
    </div>
  )
}
