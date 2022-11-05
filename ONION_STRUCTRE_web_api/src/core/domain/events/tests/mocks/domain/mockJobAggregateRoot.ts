import { AggregateRoot } from '../../../../AggregateRoot';
import { MockJobCreatedEvent } from '../events/mockJobCreatedEvent';
import { UniqueEntityID } from '../../../../UniqueEntityID';
import { MockJobDeletedEvent } from '../events/mockJobDeletedEvent';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IMockJobProps {}

export class MockJobAggregateRoot extends AggregateRoot<IMockJobProps> {
    private constructor(props: IMockJobProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static createJob(props: IMockJobProps, id?: UniqueEntityID): MockJobAggregateRoot {
        const job = new this(props, id);
        job.addDomainEvent(new MockJobCreatedEvent(job.id));
        return job;
    }

    public deleteJob(): void {
        this.addDomainEvent(new MockJobDeletedEvent(this.id));
    }
}
