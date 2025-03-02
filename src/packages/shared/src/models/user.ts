import { UserRole } from "../enums/user_role";
import { BaseEntity } from "./base";

export class IUser extends BaseEntity {

  /**
   * email of user
   */
  public email!: string;

  /**
   * password of user
   * later it shuold be encrypted with hash or other method
   */
  public password!: string;

  /**
   * Role of User
   * for now admin or normal
   */
  public userRole!: UserRole;
};
