import { registerDecorator, ValidationOptions } from 'class-validator';

export const preservedUrls = [
  'login',
  'logout',
  'signup',
  'reset-password',
  'resetpassword',
  'url-password',
  'url-info',
  'settings',
  'stats',
  'verify',
  'api',
  '404',
  'static',
  'images',
  'banned',
  'terms',
  'privacy',
  'protected',
  'report',
  'pricing',
];

export function PreservedURLsValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (preservedUrls.some((url) => url.toLowerCase() === value)) {
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
