import { useCallback, useEffect } from 'react'
import { UseDialog as Dialog } from '@/constants'
import { ERC20_ABI } from '@/contracts'
import { useMulticall, useWeb3ReactCore } from '@/hooks'
import { dialog, Fraction, modal, notice } from '@/utils'
import '@styles/pages/labs.scss'
import { useAppSelector, userSelector } from '@/store'

export default function LabsContainer() {
  // __STATE <React.Hooks>
  const { account } = useWeb3ReactCore()
  const multiCalls = useMulticall(ERC20_ABI)
  const currencyBalance = useAppSelector(userSelector.getCurrencyBalance)

  // __EFFECTS <Rect.Hooks>
  useEffect(() => {
    // if (account) {}
  }, [account])

  // __FUNCTIONS
  const handleAction = useCallback(async () => {
    if (!account) return void 0

    const results = await multiCalls([
      {
        address: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
        method: 'balanceOf',
        params: [account]
      },
      {
        address: '0x5081F7d88Cba44e88225Cb177c41e16c1635e22A',
        method: 'balanceOf',
        params: [account]
      }
    ])

    if (results) {
      for (const { value } of results) {
        const balance = Fraction.from(value.toString()).dividedBy(Fraction.BASE)
        console.log(balance.toString())
      }
    }
  }, [account, multiCalls])

  const handleDialog = useCallback(async () => {
    const results = await dialog(Dialog.DEMO, { type: 'confirm' })
    console.log('`dialog`', results)
  }, [])

  const handleModal = useCallback(() => {
    modal.on(<i>ChildrenNode</i>, { name: 'modal-labs' })
  }, [])

  const handleNotice = useCallback(() => {
    notice.info({ title: 'Text title.', content: <i>ChildrenNode</i>, duration: 0 })
  }, [])

  // __RENDER
  return (
    <div className='ui--labs router-view'>
      <div className='ui--labs-container'>
        <i>.ui--labs-container</i>

        <div className='ui--labs-context'>
          <button className='btn btn-primary' onClick={handleAction}>
            <span className='text'>BUTTON</span>
          </button>

          <button className='btn btn-primary' onClick={handleDialog}>
            <span className='text'>DIALOG</span>
          </button>

          <button className='btn btn-primary' onClick={handleModal}>
            <span className='text'>MODAL</span>
          </button>

          <button className='btn btn-primary' onClick={handleNotice}>
            <span className='text'>NOTICE</span>
          </button>
        </div>

        <div className='ui--labs-json'>
          <pre>{JSON.stringify(currencyBalance, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
