import User from "../models/User";

export const getAllUsersService = async (): Promise<{
  success: boolean;
  data?: any[];
  message: string;
  statusCode: number;
  error?: string;
}> => {
  try {
    const users = await User.find({}).select("-passwordHash");
    return {
      success: true,
      data: users,
      message: "Users retrieved successfully",
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to retrieve users",
      statusCode: 500,
    };
  }
};

export const getUserByIdService = async (
  userId: string
): Promise<{
  success: boolean;
  data?: any;
  message: string;
  statusCode: number;
  error?: string;
}> => {
  try {
    const user = await User.findById(userId).select("-passwordHash");

    if (user) {
      return {
        success: true,
        data: user,
        message: "User retrieved successfully",
        statusCode: 200,
      };
    } else {
      return { success: false, message: "User not found", statusCode: 404 };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to retrieve user",
      statusCode: 500,
    };
  }
};
