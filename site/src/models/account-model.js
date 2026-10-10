import pool from "../database.js";

/**

* Register a new account.
* The controller must provide a bcrypt-hashed password.
  */
export async function registerAccount(
    firstname,
    lastname,
    email,
    passwordHash,
    accountType = "Client"
) {
    const sql = `  INSERT INTO account (
     account_firstname,
     account_lastname,
     account_email,
     account_password,
     account_type
   )
   VALUES ($1, $2, $3, $4, $5)
   RETURNING account_id, account_firstname, account_lastname,
             account_email, account_type
    `;

    const values = [
        firstname,
        lastname,
        email.toLowerCase().trim(),
        passwordHash,
        accountType
    ];

    const result = await pool.query(sql, values);
    return result.rows[0];
}

/**

* Find an account by email for login.
* The password hash is needed for bcrypt comparison.
  */
export async function getAccountByEmail(email) {
    const sql = `  SELECT account_id, account_firstname, account_lastname,
          account_email, account_password, account_type
   FROM account
   WHERE account_email = $1
    `;

    const result = await pool.query(sql, [email.toLowerCase().trim()]);
    return result.rows[0];
}

/**

* Find an account by its ID.
  */
export async function getAccountById(accountId) {
    const sql = `  SELECT account_id, account_firstname, account_lastname,
          account_email, account_type
   FROM account
   WHERE account_id = $1
    `;

    const result = await pool.query(sql, [accountId]);
    return result.rows[0];
}

/**

* Retrieve all registered accounts for the admin users page.
* Never return password hashes to the view.
  */
export async function getAllAccounts() {
    const sql = `  SELECT account_id, account_firstname, account_lastname,
          account_email, account_type
   FROM account
   ORDER BY account_lastname, account_firstname
    `;

    const result = await pool.query(sql);
    return result.rows;
}
