CREATE SEQUENCE SEQ_PESSOATELEFONE;
CREATE TABLE PESSOATELEFONE (
	PESSOATELEFONEID NUMERIC(20) NOT NULL,
	PESSOAID NUMERIC(20),
	TIPO VARCHAR(50),
	NUMERO VARCHAR(11),
	CONSTRAINT PK_PESSOATELEFONE PRIMARY KEY (PESSOATELEFONEID),
	CONSTRAINT FK_PESSOATELEFONE1 FOREIGN KEY (PESSOAID) REFERENCES PESSOA (PESSOAID)
);

