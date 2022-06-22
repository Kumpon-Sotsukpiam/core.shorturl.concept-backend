import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNotWhiteSpaceValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const isSpace = (value || '').match(/\s/g);
          if (isSpace) {
            this.error = `${propertyName} should not be white space`;
            return false;
          }
          return true;
        },
        defaultMessage(): string {
          return this.error || 'Something went wrong';
        },
      },
    });
  };
}
