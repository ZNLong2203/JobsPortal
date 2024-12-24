import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsEndDateAfterStartDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isEndDateAfterStartDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const object = args.object as any;
          const startDate = object['startDate'];
          const endDate = value;

          if (!startDate || !endDate) {
            return false;
          }

          return new Date(endDate) > new Date(startDate);
        },
        defaultMessage() {
          return `$property must be later than startDate`;
        },
      },
    });
  };
}
