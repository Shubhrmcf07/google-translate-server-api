const { translate } = require("bing-translate-api");
const pool = require("../utils/db");
exports.test = async (req, res) => {
  return res.json("Hello World");
};

exports.translation = async (req, res) => {
  try {
    const resultfromdb = await (
      await pool
    ).query(
      `SELECT TRANSLATED_TEXT FROM translations WHERE FROM_LANG=${JSON.stringify(
        req.body.from
      )} AND TO_LANG=${JSON.stringify(req.body.to)} AND TEXT=${JSON.stringify(
        req.body.text
      )}`
    );

    if (resultfromdb.length == 0) {
      const result = await translate(
        req.body.text,
        req.body.from,
        req.body.to,
        false
      );

      const response = await (
        await pool
      ).query(
        `INSERT INTO translations (FROM_LANG, TO_LANG, TEXT, TRANSLATED_TEXT) VALUES (${JSON.stringify(
          req.body.from
        )}, ${JSON.stringify(req.body.to)}, ${JSON.stringify(
          req.body.text
        )}, ${JSON.stringify(result.translation)});`
      );

      return res.json(result.translation);
    }

    return res.json(resultfromdb[0].TRANSLATED_TEXT);
  } catch (err) {
    console.log(err);
    return res.json({ status: 500, message: "Internal Server Error" });
  }
};
