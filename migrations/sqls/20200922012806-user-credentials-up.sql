/* Replace with your SQL commands */
CREATE TABLE biotech_schema.user_credentials
(
    "id"              uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    "password"        VARCHAR NOT NULL,
    "user_id"         uuid NOT NULL,
    "created_at"      timestamp with time zone DEFAULT NOW(),
    "updated_at"      timestamp with time zone DEFAULT NOW(),
    FOREIGN KEY ("user_id") REFERENCES biotech_schema.users (id)
);

CREATE TABLE biotech_schema.refreshtoken
(
    "id"              SERIAL PRIMARY KEY UNIQUE,
    "userid"          uuid NOT NULL,
    "refreshtoken"    VARCHAR NOT NULL UNIQUE,
    "created_at"      timestamp with time zone DEFAULT NOW(),
    "updated_at"      timestamp with time zone DEFAULT NOW(),
    FOREIGN KEY ("userid") REFERENCES biotech_schema.users (id)
);

CREATE TRIGGER set_updated_at_timestamp
BEFORE UPDATE ON biotech_schema.user_credentials
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_timestamp();
