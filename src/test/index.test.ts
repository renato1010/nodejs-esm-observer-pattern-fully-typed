import { PaymentSubject, PaymentSubjectState } from "@/subjects";
import { MarketingObserver, ShipmentObserver } from "@/observers";
import { PaymentEvent } from "@/events";

describe("Test Suite for Observer Patter", () => {
  test("PaymentSubject notify observer", () => {
    const paymentSubject = new PaymentSubject();
    // mock observer
    const observer = {
      update: jest.fn(),
    };
    const data: PaymentSubjectState = { age: 20, id: "asfdasdf", userName: "Vinicius" };
    paymentSubject.subscribe(observer);
    paymentSubject.notify(data);

    expect(observer.update).toHaveBeenCalledWith(data);
    expect(observer.update).toHaveBeenCalledTimes(1);
  });
  test("PaymentSubject should not notify unsubscribed observers", () => {
    const paymentSubject = new PaymentSubject();
    // mock observers
    const observerA = {
      update: jest.fn(),
    };
    const observerB = {
      update: jest.fn(),
    };
    const data: PaymentSubjectState = { age: 20, id: "asfdasdf", userName: "Vinicius" };
    paymentSubject.subscribe(observerA);
    paymentSubject.subscribe(observerB);
    paymentSubject.notify(data);

    expect(observerA.update).toHaveBeenCalledWith(data);
    expect(observerA.update).toHaveBeenCalledTimes(1);
    expect(observerB.update).toHaveBeenCalledWith(data);
    expect(observerA.update).toHaveBeenCalledTimes(1);
    // unsubscribe observerB
    const dataB: PaymentSubjectState = { age: 35, id: "asfdasdf", userName: "Luka" };
    paymentSubject.unsubscribe(observerB);
    paymentSubject.notify(dataB);

    expect(observerA.update).toHaveBeenCalledWith(dataB);
    expect(observerA.update).toHaveBeenCalledTimes(2);
    expect(observerB.update).toHaveBeenCalledTimes(1);
  });
  test("Payment event should notify subject after a credit card transaction", () => {
    const paymentSubject = new PaymentSubject();
    const payment = new PaymentEvent(paymentSubject);

    const notifySpy = jest.spyOn(paymentSubject, "notify");
    // trigger credit card payment
    const creditCardData: PaymentSubjectState = { age: 33, id: "sadasde", userName: "Tony" };
    payment.creditCard(creditCardData);

    expect(notifySpy).toHaveBeenCalledWith(creditCardData);
    expect(notifySpy).toHaveBeenCalledTimes(1);
  });
  test("All subscribers should receive a notification", () => {
    const paymentSubject = new PaymentSubject();

    const shipmentObserver = new ShipmentObserver();
    const marketingObserver = new MarketingObserver();
    paymentSubject.subscribe(shipmentObserver);
    paymentSubject.subscribe(marketingObserver);

    const shipmentSpyOnUpdate = jest.spyOn(shipmentObserver, "update");
    const marketingSpyOnUpdate = jest.spyOn(marketingObserver, "update");

    // event
    const payment = new PaymentEvent(paymentSubject);
    const creditCardData: PaymentSubjectState = { age: 25, id: "aelwew", userName: "Federico" };
    payment.creditCard(creditCardData);

    expect(shipmentSpyOnUpdate).toHaveBeenCalledWith(creditCardData);
    expect(shipmentSpyOnUpdate).toHaveBeenCalledTimes(1);

    expect(marketingSpyOnUpdate).toHaveBeenCalledWith(creditCardData);
    expect(marketingSpyOnUpdate).toHaveBeenCalledTimes(1);
  });
});
