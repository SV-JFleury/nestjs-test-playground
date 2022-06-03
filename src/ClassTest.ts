import { Injectable } from '@nestjs/common';
import supertest from 'supertest';

@Injectable()
export class Class3 {
  hello() {
    console.log('Hello World');
  }
}

@Injectable()
export class Class2 extends Class3 {}

@Injectable()
export class Class1 extends Class2 {
  constructor() {
    super();
    this.hello();
  }
}
