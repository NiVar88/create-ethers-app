import BigNumber from 'bignumber.js'

export class Fraction extends BigNumber {
  static BASE = new BigNumber(10).pow(18)
  static ZERO = new BigNumber(0)

  static MaxUint256 = new BigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
  static MinInt256 = new BigNumber('-0x8000000000000000000000000000000000000000000000000000000000000000')
  static MaxInt256 = new BigNumber('0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

  static from(value: BigNumber.Value) {
    return new BigNumber(value)
  }

  static price(value: Fraction): number {
    return value.isNaN() ? 0 : value.toNumber()
  }
}
