import connection from "../server.js";

export const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  // Check if the admin exists
  const queryCheck = "SELECT * FROM admins WHERE username = ?";
  connection.query(queryCheck, [username], (error, results) => {
    if (error) {
      console.error("Error fetching admin:", error);
      return res.status(500).send("Server error");
    }

    if (results.length === 0) {
      // Admin not found
      return res.status(401).send("Invalid username or password");
    } else {
      // Admin found, now compare the passwords
      const admin = results[0];

      if (admin.password === password) {
        // Passwords match, login successful
        res.status(200).send("Login successful");
      } else {
        // Passwords don't match
        res.status(401).send("Invalid username or password");
      }
    }
  });
};