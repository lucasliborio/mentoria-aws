import { Controller,Post, HttpCode, Request } from '@nestjs/common';
import { ArrayValidationService } from './array-validation.service';
import {  ArrayValidationInput, ArrayValidationOutput } from './entities/array-validation.entity';


@Controller('/array-validation')
export class ArrayValidationController {
  constructor(private readonly arrayValidationService: ArrayValidationService) {}

  @Post('/validate')
  @HttpCode(200)
  create(@Request() arrayInput: any):ArrayValidationOutput {
    console.log('ARRAY INPUT', arrayInput.body)
    return this.arrayValidationService.validate(arrayInput);
  }
}
