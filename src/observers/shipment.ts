import { PaymentSubjectState } from "@/subjects";
import type { Observer } from "@/utils";

/**
 * Concrete Shipment observer react to the updates issued by the subject they had been subscribed to.
 */

class ShipmentObserver implements Observer<PaymentSubjectState> {
  public update(state: PaymentSubjectState): void {
    if (state.id && state.userName) {
      console.log(`ShipmentObserver: id=${state.id}, user=${state.userName}`);
    }
  }
}

export { ShipmentObserver };
