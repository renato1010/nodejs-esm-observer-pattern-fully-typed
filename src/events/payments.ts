import { PaymentSubject } from "@/subjects";

export class PaymentEvent {
  paymentSubject: PaymentSubject;

  constructor(subject: PaymentSubject) {
    this.paymentSubject = subject;
  }

  creditCard(paymentData: typeof this.paymentSubject.state) {
    console.log(`Payment event from ${paymentData.userName}`);
    this.paymentSubject.notify(paymentData);
  } 
}
