import { useCallback, useMemo } from 'react'
import { useCopyToClipboard } from 'react-use'
import { Wallets } from '@/constants'
import { useAuth, useWeb3ReactCore } from '@/hooks'
import { APP_CONNECTOR, BLOCK_EXPLORER } from '@/libs/configs'
import { getCookie } from '@/libs/cookies'
import { notice } from '@/utils'

export function AccountDetails() {
  // __STATE <React.Hooks>
  const { account } = useWeb3ReactCore()
  const { signout } = useAuth()
  const [_, copied] = useCopyToClipboard()
  const connected = useMemo(() => Wallets.findOne('connector', getCookie(APP_CONNECTOR)), [account])

  // __FUNCTIONS
  const handleCopy = useCallback(() => {
    if (!account) return void 0

    copied(account)
    notice.success({
      title: 'Success',
      content: 'Address copied.',
      duration: 1e3
    })
  }, [account, copied])

  // __RENDER
  return (
    <div className='ui--account-details'>
      <div className='rows'>
        <div className='title'>
          <h5 className='h5'>
            Connected with <b>{connected?.name}</b>
          </h5>

          <button className='btn btn-text btn-disconnect' onClick={signout}>
            <span className='text'>Disconnect</span>
          </button>
        </div>
      </div>

      <div className='rows'>
        <h4 className='address'>{account}</h4>
      </div>

      <div className='rows'>
        <a
          className='btn btn-text btn-addon'
          href={`${BLOCK_EXPLORER}/address/${account}`}
          rel='noreferrer noopener'
          target='_blank'
        >
          <span className='icon bi bi-box-arrow-up-right'></span>
          <span className='text'>View on explorer</span>
        </a>

        <button className='btn btn-text btn-addon' onClick={handleCopy}>
          <span className='icon bi bi-clipboard'></span>
          <span className='text'>Copy Address</span>
        </button>
      </div>
    </div>
  )
}
