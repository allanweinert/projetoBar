CREATE SEQUENCE SEQ_MUNICIPIO;
CREATE TABLE MUNICIPIO (
	MUNICIPIOID NUMERIC(20) NOT NULL,
	UF VARCHAR(2),
	NOME VARCHAR(300),
	CONSTRAINT PK_MUNICIPIO PRIMARY KEY (MUNICIPIOID)
);

ALTER TABLE PESSOA ADD MUNICIPIODENASCIMENTOID NUMERIC(20);
ALTER TABLE PESSOA ADD CONSTRAINT FK_USUARIO1 FOREIGN KEY (MUNICIPIODENASCIMENTOID) REFERENCES MUNICIPIO (MUNICIPIOID);