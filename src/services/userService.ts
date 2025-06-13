import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import config from "../config";

const generateToken = (id: string): string => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: "30d",
  });
};

export const registerUserService = async (
  userData: any
): Promise<{
  success: boolean;
  data?: any;
  message: string;
  statusCode: number;
  error?: string;
}> => {
  const { username, email, password } = userData;

  if (!username || !email || !password) {
    return {
      success: false,
      message: "Please provide username, email, and password",
      statusCode: 400,
    };
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return { success: false, message: "User already exists", statusCode: 400 };
  }

  try {
    const user = await User.create({
      username,
      email,
      passwordHash: password,
    });

    if (user) {
      return {
        success: true,
        data: {
          _id: (user as any)._id,
          username: user.username,
          email: user.email,
          token: generateToken((user as any)._id.toString()),
        },
        message: "User registered successfully",
        statusCode: 201,
      };
    } else {
      return { success: false, message: "Invalid user data", statusCode: 400 };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to register user",
      statusCode: 500,
    };
  }
};

export const loginUserService = async (
  credentials: any
): Promise<{
  success: boolean;
  data?: any;
  message: string;
  statusCode: number;
  error?: string;
}> => {
  const { email, password } = credentials;

  if (!email || !password) {
    return {
      success: false,
      message: "Please provide email and password",
      statusCode: 400,
    };
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      return {
        success: true,
        data: {
          _id: (user as any)._id,
          username: user.username,
          email: user.email,
          token: generateToken((user as any)._id.toString()),
        },
        message: "User logged in successfully",
        statusCode: 200,
      };
    } else {
      return {
        success: false,
        message: "Invalid email or password",
        statusCode: 401,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to login user",
      statusCode: 500,
    };
  }
};

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
