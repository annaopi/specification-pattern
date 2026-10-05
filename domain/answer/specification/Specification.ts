export interface Specification<T> {
    isSatisfiedBy(value: T): Promise<boolean>;
}