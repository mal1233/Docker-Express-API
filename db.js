const { Pool } = require("pg");

async function connectWithRetry() {
    const pool = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    let retries = 10; // number of retry attempts

    while (retries) {
        try {
            const result = await pool.query("SELECT NOW()");
            console.log("Connected to Postgres at:", result.rows[0].now);
            return pool; // return the connected pool
        } catch (err) {
            console.log(
                `Postgres not ready, retrying in 2s... (${retries} retries left)`
            );
            console.log("Error:", err.message);

            retries -= 1;

            // wait 2 seconds before retrying
            await new Promise((res) => setTimeout(res, 2000));
        }
    }

    throw new Error("Could not connect to Postgres after multiple retries.");
}

module.exports = {
    connectWithRetry,
};
