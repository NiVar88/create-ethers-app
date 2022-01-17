import { format } from 'date-fns'

const style = ['padding: 0 2px', 'background-color: WhiteSmoke', 'color: Navy', 'border-radius: 2px'].join('; ')

export class logger {
  static log(message: any, ...optionalParams: any[]) {
    const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss a')

    console.log(`🚀 %c[${date}]`, style, message, ...optionalParams)
  }
}
