import { BaseEntity } from "./base";

export class AniReview extends BaseEntity {

  /**
   * username of user posting review
   */
  public username?: string;

  /**
   * rating score given by user posting review
   */
  public review_rating!: string;

  /**
   * animation review that are written by user
   */
  public review_comment!: string;

  // password to edit or delete the review
  public review_password?: string;

  // id from anilist api
  public anilist_id!: number;

  // name of the anime that user is writing review for
  public anime_name!: string;

};
