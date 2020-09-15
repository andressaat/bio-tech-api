/* Replace with your SQL commands */
CREATE SCHEMA IF NOT EXISTS biotech_schema;

CREATE OR REPLACE FUNCTION set_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE biotech_schema.users
(
    "id"              SERIAL PRIMARY KEY UNIQUE,
    "nome"            VARCHAR(60) NOT NULL,
    "login"           VARCHAR(60) UNIQUE NOT NULL,
    "senha"           VARCHAR(60) NOT NULL,
    "created_at"      timestamp with time zone DEFAULT NOW(),
    "updated_at"      timestamp with time zone DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_timestamp
BEFORE UPDATE ON biotech_schema.users
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_timestamp();

INSERT INTO biotech_schema.users
("nome", "login","senha")
values
('Atendente','atendente', '$2b$10$JQEex8MHghh3JTrtWFDAyuW8m.Zs2DnrkrrFsf6lQTEMWkvGu8e6e'); -- 123

INSERT INTO biotech_schema.users
("nome", "login","senha")
values
('Gerente','gerente', '$2b$10$d89.8qfWhSsJDua2NmBy8e0BMhQitGN3M70J5stx91zYWOUOSimBq'); -- 1234

INSERT INTO biotech_schema.users
("nome", "login","senha")
values
('Instrutor','instrutor', '$2b$10$MvZEKHIZIzZaaT3eFoNQZuVo5sl7j4YBUNwPwilsxpNVaPtESFPoe'); -- 12345

INSERT INTO biotech_schema.users
("nome", "login","senha")
values
('Nutricionista','nutricionista', '$2b$10$y992Q9KAOZHCXO7OLuQurer7IEPmUuXfuJ9pwRGY3nGUglA23zLAu'); -- 123456

INSERT INTO biotech_schema.users
("nome", "login","senha")
values
('Atendente02','atendente02', '$2b$10$y992Q9KAOZHCXO7OLuQurer7IEPmUuXfuJ9pwRGY3nGUglA23zLAu'); -- 123456
