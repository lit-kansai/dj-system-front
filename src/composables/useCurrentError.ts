import { CurrentError } from '@/types/error'

export const useCurrentError = () => {
  const currentError = useState<CurrentError>('currentError', () => null)
  const setCurrentError = (error: CurrentError): void => {
    currentError.value = error
  }
  return {
    currentError,
    setCurrentError,
  }
}
