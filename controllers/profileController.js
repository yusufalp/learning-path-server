import * as db from "../config/db.js";

export const getAllProfiles = async (req, res, next) => {
  try {
    const result = await db.query(
      `
      SELECT * FROM profiles ORDER BY created_at DESC
    `,
    );

    return res.json({
      success: true,
      message: "Profiles found.",
      data: result.rows,
    });
  } catch (error) {
    console.error("Failed to fetch profiles:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    console.log('userId :>> ', userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const result = await db.query(
      `
      SELECT * FROM profiles WHERE user_id = $1
    `,
      [userId],
    );
    console.log('result.rows :>> ', result.rows);

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "User does not have a profile yet.",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile found.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Failed to fetch profile:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const createProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const {
      firstName,
      lastName,
      displayName,
      avatarUrl,
      bio,
      headline,
      phone,
      timezone,
      emailNotifications,
      pushNotifications,
    } = req.body;

    // TODO: Add validations

    const result = await db.query(
      `
      INSERT INTO profiles
      (user_id, first_name, last_name, display_name, avatar_url, bio, headline, phone, timezone, email_notifications, push_notifications)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, COALESCE($9, 'America/Los_Angeles'), COALESCE($10, false), COALESCE($11, false))
      ON CONFLICT (user_id) DO NOTHING
      RETURNING *
    `,
      [
        userId,
        firstName,
        lastName,
        displayName,
        avatarUrl,
        bio,
        headline,
        phone,
        timezone,
        emailNotifications,
        pushNotifications,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(409).json({
        success: false,
        message: "Profile already exist for this user.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Profile successfully created.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Failed to create profile:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create profile.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
