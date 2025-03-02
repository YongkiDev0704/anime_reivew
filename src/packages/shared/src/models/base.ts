/**
 * Base entity class.
 * all class should be extended by this
 */
export class BaseEntity<T = any> {
  /**
   * ID of the entity
   */
  public _id!: T;

  /**
   * Entity creation date
   */
  public createAt!: Date;

  /**
   * Entity update date
   */
  public updateAt!: Date;
};
