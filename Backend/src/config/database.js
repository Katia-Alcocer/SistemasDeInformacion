import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "mysql",
    user: "usuario",
    password: "password",
    database: "mi_proyecto",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;