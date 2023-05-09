/**
 * The Observer interface declares the update method, used by subjects.
 */

export interface Observer<SubjectState> {
    // Receive update from subject.
    update(state: SubjectState): void;
}
/**
 * The Subject interface declares a set of methods for managing subscribers.
 */
export interface Subject<State> {
    state: State;
    // Subscribe an observer to the subject.
    subscribe(observer: Observer<State>): void;

    // Unsubscribe an observer from the subject.
    unsubscribe(observer: Observer<State>): void;

    // Notify all observers about an event.
    notify(state: State): void;
}