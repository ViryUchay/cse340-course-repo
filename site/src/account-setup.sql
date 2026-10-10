CREATE TABLE IF NOT EXISTS account (
    account_id SERIAL PRIMARY KEY,
    account_firstname VARCHAR(50) NOT NULL,
    account_lastname VARCHAR(50) NOT NULL,
    account_email VARCHAR(255) NOT NULL UNIQUE,
    account_password VARCHAR(255) NOT NULL,
    account_type VARCHAR(20) NOT NULL DEFAULT 'Client'
        CHECK (account_type IN ('Client', 'Admin'))
);