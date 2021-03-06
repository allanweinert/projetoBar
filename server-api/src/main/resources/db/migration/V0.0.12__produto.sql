CREATE SEQUENCE SEQ_PRODUTO;
CREATE TABLE PRODUTO (
	PRODUTOID NUMERIC(20) NOT NULL,
	NOME VARCHAR(300) NOT NULL,
	ESTOQUE_MINIMO NUMERIC (8,2) NOT NULL,
	SITUACAO VARCHAR(10),
	
	CATEGORIAID NUMERIC(20),

	CONSTRAINT PK_PRODUTO PRIMARY KEY (PRODUTOID),
	CONSTRAINT FK_PRODUTO1 FOREIGN KEY (CATEGORIAID) REFERENCES CATEGORIA(CATEGORIAID)
);