const Pool = require("pg").Pool;
const pool = new Pool({
  connectionString: "postgresql://neondb_owner:cDkUwGAVi9g8@ep-crimson-mouse-a1jr4iqk.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
});

module.exports = pool;