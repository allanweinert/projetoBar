CREATE SEQUENCE SEQ_CATEGORIA;
CREATE TABLE CATEGORIA (
	CATEGORIAID NUMERIC(20) NOT NULL,
	NOME VARCHAR(300) NOT NULL,
	SITUACAO VARCHAR(10),
	
	CONSTRAINT PK_CATEGORIA PRIMARY KEY (CATEGORIAID)
);