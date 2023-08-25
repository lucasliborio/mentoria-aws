import { Injectable } from '@nestjs/common';
import { ArrayValidationInput, ArrayValidationOutput } from './entities/array-validation.entity';

@Injectable()
export class ArrayValidationService {
  validate(arrayValidateInput: ArrayValidationInput): ArrayValidationOutput {
    const numbers: Array<number> = []
    const letters: Array<string> = []
    console.log('SERVICE INPUT', arrayValidateInput)
    arrayValidateInput.data.split('').forEach(element => {
      Number.isNaN(Number(element)) ? letters.push(element): numbers.push(Number(element))
    });
    
    return {
      numbers,
      letters
    }
  }
}
