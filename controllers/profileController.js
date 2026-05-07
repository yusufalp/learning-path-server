import * as db from "../config/db.js";

export const getAllProfiles = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT * FROM profiles ORDER BY created_at DESC`,
    );
    console.log("rows :>> ", result.rows);

    res.json({
      success: true,
      message: "Profiles found.",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req, res, next) => {
  const { userId } = req.params;
  console.log("userId :>> ", userId);

  try {
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User does not exist.",
      });
    }

    const result = await db.query(`SELECT * FROM profiles WHERE user_id =$1`, [
      userId,
    ]);
    console.log("result :>> ", result.rows);

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "User does not have a profile yet.",
        data: null,
      });
    }

    const profile = result.rows[0];
    console.log("profile :>> ", profile);

    res.status(200).json({
      success: true,
      message: "Profile found.",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile.",
    });
  }
};
