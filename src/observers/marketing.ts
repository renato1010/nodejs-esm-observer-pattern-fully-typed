import { PaymentSubjectState } from "@/subjects";
import type { Observer } from "@/utils";

/**
 * Concrete Marketing observer react to the updates issued by the subject they had been subscribed to.
 */

class MarketingObserver implements Observer<PaymentSubjectState> {
  public update(state: PaymentSubjectState): void {
    if (state.id && state.userName) {
      console.log(`MarketingObserver: ${state.id} will receive a welcome email`);
    }
  }
}

export { MarketingObserver };
