/* Replace with your SQL commands */

-- Habilita o uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA IF NOT EXISTS biotech_schema;

CREATE OR REPLACE FUNCTION set_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TYPE biotech_schema.role_type AS ENUM(
  -- Cargos
  'atendente',
  'gerente',
  'instrutor',
  'nutricionista'
);

CREATE TABLE biotech_schema.users
(
    "id"                  uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    "name"                VARCHAR(60),
    "realm"               VARCHAR,
    "email"               VARCHAR UNIQUE NOT NULL,
    "username"            VARCHAR,
    "role"                biotech_schema.role_type,
    "email_verified"      BOOLEAN DEFAULT FALSE,
    "verification_token"  VARCHAR,
    "created_at"          timestamp with time zone DEFAULT NOW(),
    "updated_at"          timestamp with time zone DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_timestamp
BEFORE UPDATE ON biotech_schema.users
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_timestamp();

INSERT INTO biotech_schema.users
("name", "email","role")
values
('Atendente','atendente@biotech.com.br','atendente'); -- 12345678

INSERT INTO biotech_schema.users
("name", "email","role")
values
('Gerente','gerente@biotech.com.br', 'gerente'); -- 12345678

INSERT INTO biotech_schema.users
("name", "email","role")
values
('Instrutor','instrutor@biotech.com.br', 'instrutor'); -- 12345678

INSERT INTO biotech_schema.users
("name", "email","role")
values
('Nutricionista','nutricionista@biotech.com.br', 'nutricionista'); -- 12345678

INSERT INTO biotech_schema.users
("name", "email","role")
values
('Atendente02','atendente02@biotech.com.br', 'atendente'); -- 12345678
