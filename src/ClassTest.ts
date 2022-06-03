import { Injectable } from '@nestjs/common';

@Injectable()
export class Class3 {
  hello() {
    console.log('Hello World');
  }
}

@Injectable()
export class Class2 {
  constructor(public class3: Class3) {}
}

@Injectable()
export class Class1 {
  constructor(public class2: Class2) {}
}
