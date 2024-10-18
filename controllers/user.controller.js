import bcrypt from 'bcrypt';
import connection from "../server.js";

export const signupUser = (req, res) => {
    const { username, email, password } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).send("Server error");
        }

        // Insert the new user into the database
        const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        connection.query(query, [username, email, hash], (error, results) => {
            if (error) {
                console.error("Error creating user:", error);
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(409).send("Username or email already exists");
                }
                return res.status(500).send("Server error");
            }
            res.status(201).send("User created successfully");
        });
    });
};

export const loginUser = (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    const query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [email], (error, results) => {
        if (error) {
            console.error("Error fetching user:", error);
            return res.status(500).send("Server error");
        }

        if (results.length === 0) {
            // User not found
            return res.status(401).send("Invalid email or password");
        }

        // User found, now compare the passwords
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).send("Server error");
            }

            if (isMatch) {
                // Passwords match, login successful
                res.status(200).send("Login successful");
            } else {
                // Passwords don't match
                res.status(401).send("Invalid email or password");
            }
        });
    });
};