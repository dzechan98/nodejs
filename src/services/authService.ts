import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";

const generateAccessToken = (userId: string): string => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id }, config.jwtRefreshSecret, {
    expiresIn: "7d",
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
          accessToken: generateAccessToken((user as any)._id.toString()),
          refreshToken: generateRefreshToken((user as any)._id.toString()),
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
          accessToken: generateAccessToken((user as any)._id.toString()),
          refreshToken: generateRefreshToken((user as any)._id.toString()),
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

export const refreshTokenService = async (
  refreshToken: string
): Promise<{
  success: boolean;
  accessToken?: string;
  message: string;
  statusCode: number;
  error?: string;
}> => {
  if (!refreshToken) {
    return {
      success: false,
      message: "Refresh token is required",
      statusCode: 400,
    };
  }

  try {
    const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret) as {
      id: string;
      iat: number;
      exp: number;
    };
    const user = await User.findById(decoded.id);

    if (!user) {
      return {
        success: false,
        message: "Invalid refresh token - user not found",
        statusCode: 401,
      };
    }

    const newAccessToken = generateAccessToken((user._id as any).toString());

    return {
      success: true,
      accessToken: newAccessToken,
      message: "Access token refreshed successfully",
      statusCode: 200,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return {
        success: false,
        message: "Refresh token expired",
        statusCode: 401,
      };
    } else if (error instanceof jwt.JsonWebTokenError) {
      return {
        success: false,
        message: "Invalid refresh token",
        statusCode: 401,
      };
    } else {
      return {
        success: false,
        message: "Failed to refresh token",
        error: error instanceof Error ? error.message : "Unknown error",
        statusCode: 500,
      };
    }
  }
};
