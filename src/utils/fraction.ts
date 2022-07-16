import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits, parseUnits } from '@ethersproject/units'

export class Fraction extends BigNumber {
  static BASE = BigNumber.from(10).pow(18)
  static ZERO = BigNumber.from(0)

  static MaxUint256 = BigNumber.from('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
  static MinInt256 = BigNumber.from('-0x8000000000000000000000000000000000000000000000000000000000000000')
  static MaxInt256 = BigNumber.from('0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

  static formatUnits = formatUnits
  static parseUnits = parseUnits
}
