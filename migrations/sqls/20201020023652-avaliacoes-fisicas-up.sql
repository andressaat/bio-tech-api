/* Replace with your SQL commands */
CREATE OR REPLACE FUNCTION set_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE biotech_schema.avaliacoes_fisicas
(
  "id"                        SERIAL PRIMARY KEY UNIQUE,
  "user_id"                   uuid NOT NULL,-- Quem fez a avaliação
  "aluno_id"                  INTEGER NOT NULL,-- Quem foi avaliado
  "meta_peso"                 DECIMAL(8,3)  NOT NULL, -- 99999.999
  "peso"                      DECIMAL(8,3)  NOT NULL, -- 99999.999
  "altura"                    DECIMAL(8,3)  NOT NULL, -- 99999.999
  "imc"                       DECIMAL(8,3)  NOT NULL, -- 99999.999
  "ombro"                     DECIMAL(8,3)  NOT NULL, -- 99999.999
  "peitoral"                  DECIMAL(8,3)  NOT NULL, -- 99999.999
  "cintura"                   DECIMAL(8,3)  NOT NULL, -- 99999.999
  "abdomen"                   DECIMAL(8,3)  NOT NULL, -- 99999.999
  "quadril"                   DECIMAL(8,3)  NOT NULL, -- 99999.999
  "panturrilha_direita"       DECIMAL(8,3)  NOT NULL, -- 99999.999
  "panturrilha_esquerda"      DECIMAL(8,3)  NOT NULL, -- 99999.999
  "pescoco"                   DECIMAL(8,3)  NOT NULL, -- 99999.999
  "punho"                     DECIMAL(8,3)  NOT NULL, -- 99999.999
  "coxa_direita"              DECIMAL(8,3)  NOT NULL, -- 99999.999
  "coxa_esquerda"             DECIMAL(8,3)  NOT NULL, -- 99999.999
  "coxa_proximal_direita"     DECIMAL(8,3)  NOT NULL, -- 99999.999
  "coxa_proximal_esquerda"    DECIMAL(8,3)  NOT NULL, -- 99999.999
  "braco_relaxado_direito"    DECIMAL(8,3)  NOT NULL, -- 99999.999
  "braco_relaxado_esquerdo"   DECIMAL(8,3)  NOT NULL, -- 99999.999
  "braco_contraido_direito"   DECIMAL(8,3)  NOT NULL, -- 99999.999
  "braco_contraido_esquerdo"  DECIMAL(8,3)  NOT NULL, -- 99999.999
  "antebraco"                 DECIMAL(8,3)  NOT NULL, -- 99999.999
  "created_at"                TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updated_at"                TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE biotech_schema.refeicoes AS ENUM(
  'cafe_manha',
  'lanche_manha',
  'almoco',
  'lanche_tarde',
  'jantar',
  'obrigacao'
);

CREATE TABLE biotech_schema.dietas_nutricionais
(
  "id"           SERIAL PRIMARY KEY UNIQUE,
  "user_id"      uuid NOT NULL,-- Quem criou a dieta
  "aluno_id"     INTEGER NOT NULL,-- Quem foi avaliado
  "refeicao"     biotech_schema.refeicoes NOT NULL,
  "segunda"      VARCHAR NOT NULL,
  "terca"        VARCHAR NOT NULL,
  "quarta"       VARCHAR NOT NULL,
  "quinta"       VARCHAR NOT NULL,
  "sexta"        VARCHAR NOT NULL,
  "sabado"       VARCHAR NOT NULL,
  "domingo"      VARCHAR NOT NULL,
  "created_at"   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updated_at"   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX dietas_nutricionais_aluno_id_refeicao
ON biotech_schema.dietas_nutricionais (aluno_id, refeicao);


CREATE TRIGGER set_updated_at_timestamp
BEFORE UPDATE ON  biotech_schema.dietas_nutricionais
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_timestamp();

CREATE TRIGGER set_updated_at_timestamp
BEFORE UPDATE ON  biotech_schema.avaliacoes_fisicas
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_timestamp();
