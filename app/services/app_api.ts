import { Service } from 'typedi'

@Service()
export default class APIService {

  async getGreetingString (name: string) {
    return `Hello, ${name}! Nice to meet you!`
  }

  async getArithmeticResult (optr1: number, optr2: number) {
    let result = {
      addition: optr1 + optr2,
      subtraction: optr1 - optr2,
      multiplication: optr1 * optr2,
      division: optr1 / optr2
    }
    return result
  }

}
