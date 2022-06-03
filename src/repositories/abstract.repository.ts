import { EntityManager } from 'typeorm';
import { db } from '..';

export default abstract class AbstractRepository {
    constructor();
    constructor(manager: EntityManager);
    constructor(public manager: EntityManager = db.manager) {}
}
