import { AxiosError } from 'axios'

export const getAxiosErrorDetail = (error: AxiosError): string => {
  const baseMessage = `Axiosエラーが発生しました: ${error.message}`
  if (!error.code) { return `${baseMessage} エラーコード: ${error.code}` }
  switch (error.code) {
    case '400':
      return `${baseMessage} リクエストが不正です`
    case '401':
      return `${baseMessage} 認証に失敗しました。資格情報をご確認ください`
    case '403':
      return `${baseMessage} アクセスが禁止されています`
    case '404':
      return `${baseMessage} 要求されたリソースが見つかりませんでした`
    case '408':
      return `${baseMessage} リクエストがタイムアウトしました`
    case '500':
      return `${baseMessage} サーバ内部エラーが発生しました`
    case '502':
      return `${baseMessage} バッドゲートウェイエラーが発生しました`
    case '503':
      return `${baseMessage} サービス利用不可`
    case '504':
      return `${baseMessage} ゲートウェイタイムアウトエラーが発生しました`
    // 必要に応じてより多くのケースを追加します
    default:
      return `${baseMessage} エラーコード: ${error.code}`
  }
}
