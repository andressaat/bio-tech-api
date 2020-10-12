/* Replace with your SQL commands */
CREATE OR REPLACE FUNCTION set_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TYPE biotech_schema.payment_type AS ENUM(
  -- Cargos
  'dinheiro',
  'debito',
  'credito'
);

CREATE TABLE biotech_schema.pagamentos
(
  "id"              uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "valor_pago"      DECIMAL(8,2)  NOT NULL, -- 999999.99
  "forma_pagamento" biotech_schema.payment_type  NOT NULL,
  "data_vencimento" timestamp with time zone  NOT NULL,
  "user_id"         uuid NOT NULL,
  "aluno_id"        INTEGER NOT NULL,
  "created_at"      timestamp with time zone DEFAULT NOW(),
  "updated_at"      timestamp with time zone DEFAULT NOW(),
  FOREIGN KEY ("user_id") REFERENCES biotech_schema.users (id),
  FOREIGN KEY ("aluno_id") REFERENCES biotech_schema.alunos (id)
);


CREATE TRIGGER set_updated_at_timestamp
BEFORE UPDATE ON  biotech_schema.pagamentos
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_timestamp();
