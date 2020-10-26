/* Replace with your SQL commands */
CREATE OR REPLACE FUNCTION set_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE biotech_schema.produtos
(
  "id"              SERIAL PRIMARY KEY UNIQUE,
  "nome"            VARCHAR NOT NULL,
  "valor"           DECIMAL(12,2) NOT NULL,
  "min_estoque"     INTEGER DEFAULT 1 NOT NULL,
  "qtd_estoque"     INTEGER DEFAULT 1 NOT NULL,
  "created_at"      timestamp with time zone DEFAULT NOW(),
  "updated_at"      timestamp with time zone DEFAULT NOW()
);

CREATE TABLE biotech_schema.pedidos
(
  "id"              SERIAL PRIMARY KEY UNIQUE,
  "valor"           DECIMAL(12,2) NOT NULL,
  "created_at"      timestamp with time zone DEFAULT NOW(),
  "updated_at"      timestamp with time zone DEFAULT NOW()
);

CREATE TABLE biotech_schema.itens_pedidos
(
  "id"              SERIAL PRIMARY KEY UNIQUE,
  "produto_id"      INTEGER NOT NULL,
  "pedido_id"       INTEGER NOT NULL,
  "valor_unitario"  DECIMAL(12,2) NOT NULL,
  "quantidade"      INTEGER NOT NULL,
  "created_at"      timestamp with time zone DEFAULT NOW(),
  "updated_at"      timestamp with time zone DEFAULT NOW(),
  FOREIGN KEY ("produto_id") REFERENCES biotech_schema.produtos (id),
  FOREIGN KEY ("pedido_id") REFERENCES biotech_schema.pedidos (id)
);

CREATE TRIGGER set_updated_at_timestamp
BEFORE UPDATE ON biotech_schema.produtos
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_timestamp();

CREATE TRIGGER set_updated_at_timestamp
BEFORE UPDATE ON biotech_schema.pedidos
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_timestamp();

CREATE TRIGGER set_updated_at_timestamp
BEFORE UPDATE ON biotech_schema.itens_pedidos
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_timestamp();

INSERT INTO biotech_schema.produtos
("nome", "valor", "min_estoque", "qtd_estoque")
values
('Àgua sem gas', 2.00, 10, 300),
('Àgua com gas', 2.00, 10, 300),
('Suco Natual', 5.00, 10, 300),
('Kit 2x Whey Protein 900g + Cafeina 60 Cáps + Colageno 100g + BCAA 250g BRN FOODS', 99.99, 10, 300),
('Kit Whey Complex + Bcaa + Gluta + Crea + Colágeno + Shaker', 119.99, 10, 300),
('Creatina Monohidratada 200g', 34.99, 10, 300),
('Kit Pré Treino Feminino Hydrocut 180g - Max Titanium+ Shaker', 82.99, 10, 300),
('Bcaa2400 (60caps) - Max Titanium', 82.99, 10, 300);
