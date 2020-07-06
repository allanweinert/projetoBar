CREATE SEQUENCE SEQ_LOCALARMAZENAMENTO;
CREATE TABLE LOCALARMAZENAMENTO (
	LOCALARMAZENAMENTOID NUMERIC(20) NOT NULL,
	NOME VARCHAR(300) NOT NULL,
	SITUACAO VARCHAR(10),
	
	CONSTRAINT PK_LOCALARMAZENAMENTO PRIMARY KEY (LOCALARMAZENAMENTOID)
);

INSERT INTO localarmazenamento (localarmazenamentoid,nome,situacao) VALUES
(1,'Central','ATIVO')
,(2,'Matriz','ATIVO')
,(3,'Filial','ATIVO')