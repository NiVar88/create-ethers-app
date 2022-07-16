export interface ISignatureParams {
  address: string
  signature: string
}

export interface IRespNonce {
  address: string
  nonce: string
}

export interface IRespToken {
  tokenType: string
  accessToken: IRespTokenField
  refreshToken: IRespTokenField
}

export interface IRespTokenField {
  payload: string
  expiresAt: string
}
