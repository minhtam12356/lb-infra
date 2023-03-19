import { Entity, property } from '@loopback/repository';
import { IdType, IEntity } from '@/common/types';
import { TzMixin, DataTypeMixin, TextSearchMixin, UserAuditMixin } from '@/mixins';

// ---------------------------------------------------------------------
export class BaseEntity extends Entity { }

// ---------------------------------------------------------------------
export class BaseIdEntity extends BaseEntity implements IEntity {
  @property({ type: 'number', id: true, generated: true })
  id: IdType;
}

// ---------------------------------------------------------------------
export class BaseTzEntity extends TzMixin(BaseIdEntity) { }

// ---------------------------------------------------------------------
export class BaseUserAuditTzEntity extends UserAuditMixin(BaseTzEntity) { }

// ---------------------------------------------------------------------
export class BaseDataTypeTzEntity extends DataTypeMixin(BaseTzEntity) { }

// ---------------------------------------------------------------------
export class BaseTextSearchTzEntity extends TextSearchMixin(BaseTzEntity) { }

// ---------------------------------------------------------------------
export class ApplicationError extends Error {
  protected statusCode: number;

  constructor(opts: { message: string; statusCode?: number }) {
    const { message, statusCode = 400 } = opts;
    super(message);
    this.statusCode = statusCode;
  }
}
