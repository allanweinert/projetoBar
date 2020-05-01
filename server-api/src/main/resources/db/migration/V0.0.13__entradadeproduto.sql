CREATE SEQUENCE SEQ_ENTRADAPRODUTO;
CREATE TABLE ENTRADAPRODUTO (
	ENTRADAPRODUTOID NUMERIC(20) NOT NULL,
	FORNECEDORID NUMERIC(20),
	DATAENTRADA DATE,
		
	CONSTRAINT PK_ENTRADAPRODUTO PRIMARY KEY (ENTRADAPRODUTOID),
	CONSTRAINT FK_ENTRADAPRODUTO1 FOREIGN KEY (FORNECEDORID) REFERENCES FORNECEDOR (FORNECEDORID)
);