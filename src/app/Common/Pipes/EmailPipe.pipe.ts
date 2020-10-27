import {Pipe, PipeTransform} from '@angular/core';
@Pipe ({
   name : 'email'
})
export class EmailPipe implements PipeTransform {
   transform(email: string): string {
       try {
          const splitMailArr = email.split('+');
          if (splitMailArr.length === 0) {
             return 'No email provided';
          }
          return splitMailArr[splitMailArr.length - 1]; // returning the suffix of the email string as received from server
       } catch {
          return email;
      }
   }
}