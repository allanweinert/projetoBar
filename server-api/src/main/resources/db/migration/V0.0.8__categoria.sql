CREATE SEQUENCE SEQ_CATEGORIA;
CREATE TABLE CATEGORIA (
	CATEGORIAID NUMERIC(20) NOT NULL,
	NOME VARCHAR(300) NOT NULL,
	SITUACAO VARCHAR(10),
	
	CONSTRAINT PK_CATEGORIA PRIMARY KEY (CATEGORIAID)
);

INSERT INTO categoria (categoriaid, nome, situacao) VALUES
(1, 'Refrigerantes', 'ATIVO')
,(2, 'Chocolates', 'ATIVO')
,(3, 'Cervejas', 'ATIVO')
,(4, 'Energéticos', 'ATIVO')
,(5, 'Salgadinhos', 'ATIVO');