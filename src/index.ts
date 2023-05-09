import { PaymentEvent } from "@/events";
import { MarketingObserver, ShipmentObserver } from "@/observers";
import { PaymentSubject } from "@/subjects";

const subject = new PaymentSubject();

const marketing = new MarketingObserver();
subject.subscribe(marketing);
const shipment = new ShipmentObserver();
subject.subscribe(shipment);

const payment = new PaymentEvent(subject);
payment.creditCard({ id: "abc", userName: "Renato", age: 40 });

subject.unsubscribe(marketing);

// this will trigger only the shipment observer
payment.creditCard({ id: "xyz", userName: "karim", age: 40 });
