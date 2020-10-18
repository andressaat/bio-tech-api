/* Replace with your SQL commands */
CREATE OR REPLACE FUNCTION set_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE biotech_schema.grupos_musculares
(
  "id"              SERIAL PRIMARY KEY UNIQUE,
  "nome"            VARCHAR(60) NOT NULL,
  "created_at"      timestamp with time zone DEFAULT NOW(),
  "updated_at"      timestamp with time zone DEFAULT NOW()
);

CREATE TABLE biotech_schema.exercicios
(
  "id"              SERIAL PRIMARY KEY UNIQUE,
  "nome"            VARCHAR(60) NOT NULL,
  "grupo_id"        INTEGER NOT NULL,
  "created_at"      timestamp with time zone DEFAULT NOW(),
  "updated_at"      timestamp with time zone DEFAULT NOW(),
  FOREIGN KEY ("grupo_id") REFERENCES biotech_schema.grupos_musculares (id) ON DELETE CASCADE
);


CREATE TABLE biotech_schema.treinos
(
  "id"              SERIAL PRIMARY KEY UNIQUE,
  "nome"            VARCHAR(60) NOT NULL,
  "aluno_id"        INTEGER NOT NULL,
  "data_inicio"     DATE NOT NULL,
  "data_termino"    DATE NOT NULL,
  "dias_da_semana"  INTEGER[] NOT NULL,
  "created_at"      timestamp with time zone DEFAULT NOW(),
  "updated_at"      timestamp with time zone DEFAULT NOW(),
  FOREIGN KEY ("aluno_id") REFERENCES biotech_schema.alunos (id) ON DELETE CASCADE
);

CREATE TABLE biotech_schema.treino_exercicios
(
  "id"              SERIAL PRIMARY KEY UNIQUE,
  "treino_id"       INTEGER NOT NULL,
  "exercicio_id"    INTEGER NOT NULL,
  "carga"           INTEGER NOT NULL,
  "repeticao"       INTEGER NOT NULL,
  "serie"           INTEGER NOT NULL,
  "observacoes"     VARCHAR,
  "created_at"      timestamp with time zone DEFAULT NOW(),
  "updated_at"      timestamp with time zone DEFAULT NOW(),
  FOREIGN KEY ("treino_id") REFERENCES biotech_schema.treinos (id) ON DELETE CASCADE,
  FOREIGN KEY ("exercicio_id") REFERENCES biotech_schema.exercicios (id) ON DELETE CASCADE
);

CREATE TRIGGER set_updated_at_timestamp
BEFORE UPDATE ON  biotech_schema.grupos_musculares
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_timestamp();

CREATE TRIGGER set_updated_at_timestamp
BEFORE UPDATE ON  biotech_schema.exercicios
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_timestamp();

CREATE TRIGGER set_updated_at_timestamp
BEFORE UPDATE ON  biotech_schema.treinos
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_timestamp();

CREATE TRIGGER set_updated_at_timestamp
BEFORE UPDATE ON  biotech_schema.treino_exercicios
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_timestamp();

INSERT INTO biotech_schema.grupos_musculares(nome)
VALUES ('Peito'),
('Costas'),
('Perna'),
('Glúteo'),
('Ombro'),
('Bíceps'),
('Tríceps'),
('Outros');

INSERT INTO biotech_schema.exercicios (nome, grupo_id)
VALUES ('Supino Reto', 1), -- Peito
('Supino Inclinado', 1), -- Peito
('Supino Declinado', 1), -- Peito
('Crucifixo', 1), -- Peito
('Voador', 1), -- Peito
('Cross-over', 1), -- Peito
('Puxador', 2), -- Costas
('Remada Baixa', 2), -- Costas
('Remada Cavalinho', 2), -- Costas
('Remada Unilateral', 2), -- Costas
('Fly Invertido', 2), -- Costas
('Crucifixo Invertido', 2), -- Costas
('Pullover', 2), -- Costas
('Barra Fixa', 2), -- Costas
('Remada Curvada', 2), -- Costas
('Polia Alta', 2), -- Costas
('Agachamento', 3), -- Perna
('Extensora', 3), -- Perna
('Flexora', 3), -- Perna
('Adutora', 3), -- Perna
('Panturrilha', 3), -- Perna
('Levate de Terra', 3), -- Perna
('Leg-press', 3), -- Perna
('Quatro Apoios', 4), -- Glúteo
('Polia', 4), -- Glúteo
('Desenvolvimento Máquina', 5), -- Ombro
('Desenvolvimento Barra', 5), -- Ombro
('Desenvolvimento Haltéres', 5), -- Ombro
('Elevação Lateral', 5), -- Ombro
('Elevação Frontal', 5), -- Ombro
('Remada Alta', 5), -- Ombro
('Enconlhimeto', 5), -- Ombro
('Rosca Direta', 6), -- Bíceps
('Rosca Alternada', 6), -- Bíceps
('Rosca Invertida', 6), -- Bíceps
('Rosca Concentrada', 6), -- Bíceps
('Rosca Martelo', 6), -- Bíceps
('Rosca Scott', 6), -- Bíceps
('Rosca Cross-over', 6), -- Bíceps
('Triceps Polia', 7), -- Tríceps
('Triceps Corda', 7), -- Tríceps
('Triceps Testa', 7), -- Tríceps
('Triceps Francês', 7), -- Tríceps
('Triceps Supinado', 7), -- Tríceps
('Triceps Paralela', 7), -- Tríceps
('Triceps Rosca', 7), -- Tríceps
('Triceps Banco', 7), -- Tríceps
('Kick-back', 7); -- Tríceps


