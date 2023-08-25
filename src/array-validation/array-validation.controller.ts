import { Controller,Post, HttpCode, Request, Body } from '@nestjs/common';
import { ArrayValidationService } from './array-validation.service';
import {  ArrayValidationInput, ArrayValidationOutput } from './entities/array-validation.entity';


@Controller('/array-validation')
export class ArrayValidationController {
  constructor(private readonly arrayValidationService: ArrayValidationService) {}

  @Post('/validate')
  @HttpCode(200)
  create(@Body() arrayInput: any):ArrayValidationOutput {
    console.log('ARRAY INPUT', arrayInput)
    return this.arrayValidationService.validate(arrayInput);
  }
}
