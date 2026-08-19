CREATE DATABASE db_produto;

USE db_produto;

CREATE TABLE tbStatus (
    idStatus INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(10),
    PRIMARY KEY (idStatus)
);

DROP TABLE tbStatus;
    
CREATE TABLE tbCliente (
    idCliente INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    logradouro VARCHAR(100) NOT NULL,
    numero INT NOT NULL,
    idStatus INT NOT NULL,
    limite_de_credito FLOAT NOT NULL,
    PRIMARY KEY (idCliente),
    FOREIGN KEY (idStatus)
        REFERENCES tbStatus (idStatus)
);

DROP TABLE tbCliente;

-- inserir dados
INSERT INTO tbStatus (nome) VALUES
    ('BOM'),
    ('REGULAR'),
    ('RUIM');
    
INSERT  INTO  tbcliente (nome, logradouro, numero, idStatus, limite_de_credito) VALUES
	('Rayer - Traidor', 'Rua da Sorte', 66, 1, 0.50 ) ,
	('Pimental Moedas', 'Av. dos Texteis', 77, 2, 0.25 ),
	( 'Emanuel Pisadinha', 'Embaixo da Ponte', 15, 2, 0.11);
    
-- Consultas
SELECT * FROM tbCliente;

SELECT nome, (limite_de_credito * 100) AS limite_centavos FROM tbCliente;

SELECT * FROM tbStatus;