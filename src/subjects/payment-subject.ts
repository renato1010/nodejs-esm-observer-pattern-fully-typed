import type { Subject, Observer } from "@/utils";

export interface PaymentSubjectState {
  id?: string;
  userName?: string;
  age?: number;
}

/**
 * The PaymentSubject is a concrete subject, which owns some important state and notifies
 * observers when the state changes.
 */

export class PaymentSubject implements Subject<PaymentSubjectState> {
  #observers = new Set<Observer<PaymentSubjectState>>();

  /**
   * Subject's state essential to all subscribers, stored in this.state.
   */
  public state: PaymentSubjectState = {};

  /**
   * The subscription management methods.
   */

  public subscribe(observer: Observer<PaymentSubjectState>): void {
    const isExist = this.#observers.has(observer);
    if (isExist) {
      return console.log("PaymentSubject: Observer has been attached already.");
    }
    console.log("PaymentSubject: Attached an observer.");
    this.#observers.add(observer);
  }

  public unsubscribe(observer: Observer<PaymentSubjectState>): void {
    const hasObserver = this.#observers.has(observer);
    if (!hasObserver) {
      return console.log("PaymentSubject: Nonexistent observer.");
    }
    this.#observers.delete(observer);
    console.log("PaymentSubject: Detached an observer.");
  }

  /**
   * Trigger an update in each subscriber.
   */
  public notify(data: PaymentSubjectState): void {
    console.log("PaymentSubject: Notifying observers...");
    // update local state
    this.state = data;
    for (const observer of this.#observers) {
      observer.update(this.state);
    }
  }
}
