const server = require("../config/DBconnection");

const targetTable = "resigned";
const targetColumns = [
  "psid",
  "name",
  "resignation_date",
  "last_working_day",
  "resigned",
];

exports.getAllResigned = async (req, res) => {
  try {
    server.query(
      "SELECT * FROM man_power WHERE resigned = 'yes'",
      (err, result) => {
        if (err) {
          console.error("Error fetching data from the database:", err);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error." });
        }

        // Insert or update fetched data into the target table
        result.forEach(async (item) => {
          const values = targetColumns.map((column) => item[column]);

          // Check if the record with the same 'id' already exists
          const checkQuery = `SELECT * FROM ${targetTable} WHERE psid = ?`;
          server.query(
            checkQuery,
            [item.psid],
            async (checkErr, checkResult) => {
              if (checkErr) {
                console.error("Error checking existing data:", checkErr);
              } else {
                if (checkResult.length > 0) {
                  // Update the existing record
                  const updateQuery = `UPDATE ${targetTable} SET ${targetColumns
                    .map((col) => `${col} = ?`)
                    .join(", ")} WHERE psid = ?`;
                  server.query(
                    updateQuery,
                    [...values, item.psid],
                    (updateErr, updateResult) => {
                      if (updateErr) {
                        console.error("Error updating data:", updateErr);
                      } else {
                        console.log(
                          `Updated ${updateResult.affectedRows} row(s) in ${targetTable}`
                        );
                      }
                    }
                  );
                } else {
                  // Insert a new record
                  const insertQuery = `INSERT INTO ${targetTable} (${targetColumns.join(
                    ", "
                  )}) VALUES (?)`;
                  server.query(
                    insertQuery,
                    [values],
                    (insertErr, insertResult) => {
                      if (insertErr) {
                        console.error(
                          "Error inserting data into the database:",
                          insertErr
                        );
                      } else {
                        console.log(
                          `Inserted ${insertResult.affectedRows} row(s) into ${targetTable}`
                        );
                      }
                    }
                  );
                }
              }
            }
          );
        });

        // Additional functionality to update 'resigned' column
        server.query(
          "SELECT psid, resigned FROM resigned",
          (selectErr, selectResult) => {
            if (selectErr) {
              console.error(
                "Error fetching data from 'resigned' table:",
                selectErr
              );
              return res
                .status(500)
                .json({ success: false, message: "Internal server error." });
            }

            // Iterate through 'resigned' table data
            selectResult.forEach(async (row) => {
              const checkQuery =
                "SELECT * FROM man_power WHERE psid = ? AND resigned = 'no'";
              server.query(
                checkQuery,
                [row.psid],
                async (checkErr, checkResult) => {
                  if (checkErr) {
                    console.error("Error checking 'man_power' data:", checkErr);
                  } else {
                    if (checkResult.length !== 0) {
                      const updateQuery =
                        "UPDATE resigned SET resigned = 'no' WHERE psid = ?";
                      server.query(
                        updateQuery,
                        [row.psid],
                        (updateErr, updateResult) => {
                          if (updateErr) {
                            console.error(
                              "Error updating 'resigned' table:",
                              updateErr
                            );
                          } else {
                            console.log(
                              `Updated 'resigned' column for psid ${row.psid} to 'no'`
                            );
                          }
                        }
                      );
                    }
                  }
                }
              );
            });
          }
        );
        // Send the fetched data to the frontend
        res.json({
          success: true,
          message: "Data inserted into the database.",
          result,
        });
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
