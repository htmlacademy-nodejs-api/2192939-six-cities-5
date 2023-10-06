export class CreateReviewDto {
  public text: string;
  public date: Date | undefined;
  public rating: number;
  public userId: string;
}
