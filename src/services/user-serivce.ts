import UserModel, { UserDocument } from "@models/user";

export interface CreateUserDto {
  _id: string | number;
  username?: string;
  fullname?: string;
  language?: string;
}
export const createUser = (
  createUserDto: CreateUserDto
): Promise<UserDocument> => {
  return UserModel.create(createUserDto);
};

export const findUser = (_id: string | number) => {
  return UserModel.findById(_id).exec();
};

export const updateUserActivity = async (_id: string | number) => {
  await UserModel.findByIdAndUpdate(_id, {
    $set: {
      lastActivity: new Date(),
    },
  }).exec();
};
