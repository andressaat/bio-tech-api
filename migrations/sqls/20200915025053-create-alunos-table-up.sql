/* Replace with your SQL commands */
CREATE OR REPLACE FUNCTION set_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE biotech_schema.pacotes
(
    "id"                    SERIAL PRIMARY KEY UNIQUE,
    "nome"                  VARCHAR(60) NOT NULL,
    "detalhes"              VARCHAR NOT NULL,
    "valor"                 DECIMAL(12,2) NOT NULL,
    "created_at"            timestamp with time zone DEFAULT NOW(),
    "updated_at"            timestamp with time zone DEFAULT NOW()
);

-- Pacotes iniciais

INSERT INTO biotech_schema.pacotes
("nome", "detalhes","valor")
values
('Pacote Junior','tem direito a piscina, musculação', 55.25);

INSERT INTO biotech_schema.pacotes
("nome", "detalhes","valor")
values
('Pacote total 01','tem direito a piscina, musculação, aula de dança, poli dence ou artes marciais', 125.00);

INSERT INTO biotech_schema.pacotes
("nome", "detalhes","valor")
values
('Pacote total 02','tem direito a piscina, musculação, aula de dança, poli dence ou artes marciais, nutricionista off', 165.00);

CREATE TABLE biotech_schema.alunos
(
    "id"                    SERIAL PRIMARY KEY UNIQUE,
    "nome"                  VARCHAR(60) NOT NULL,
    "data_inicio"           timestamp with time zone NOT NULL,
    "cpf"                   VARCHAR NOT NULL,
    "rg"                    VARCHAR NOT NULL,
    "endereco"              VARCHAR NOT NULL,
    "data_nascimento"       timestamp with time zone NOT NULL,
    "telefone"              VARCHAR NOT NULL,
    "observacaoes"          VARCHAR,
    "objetivo"              VARCHAR,
    "pacote_id"             INTEGER NOT NULL,
    "created_at"            timestamp with time zone DEFAULT NOW(),
    "updated_at"            timestamp with time zone DEFAULT NOW(),
    FOREIGN KEY ("pacote_id") REFERENCES biotech_schema.pacotes (id)
);


CREATE TRIGGER set_updated_at_timestamp
BEFORE UPDATE ON biotech_schema.alunos
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_timestamp();

CREATE TRIGGER set_updated_at_timestamp
BEFORE UPDATE ON  biotech_schema.pacotes
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_timestamp();

INSERT INTO biotech_schema.alunos
("nome", "data_inicio","cpf","rg","endereco","data_nascimento","telefone","pacote_id")
values
('Alex Pereira', NOW(),'12121212112','sp23123123132','minha CASA',NOW(), '11989230482', 1);

