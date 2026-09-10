CREATE DATABASE db_confeitaria
USE db_confeitaria;

CREATE TABLE tblCliente(
	codCliente INT IDENTITY(1,1) PRIMARY KEY,
	nomeCliente VARCHAR (150),
	dataNascimentoCliente DATE,
	ruaCliente VARCHAR(20),
	numCasaCliente INT,
	cepCliente VARCHAR (10),
	bairroCliente VARCHAR (100),
	cidadeCliente VARCHAR (100),
	estadoCliente VARCHAR (100),
	cpfCliente VARCHAR(14),
	sexoCliente VARCHAR (100)
)

CREATE TABLE tblCategoriaProduto(
	codCategoriaProduto		INT IDENTITY(1,1) PRIMARY KEY,
	nomeCategoriaProduto	VARCHAR (100)
)

CREATE TABLE tblEncomenda(
	codEncomenda		INT IDENTITY(1,1) PRIMARY KEY,
	dataEncomenda		DATETIME,
	codCliente			INT,
	valorTotalEncomenda MONEY,
	dataEntregaEncomenda DATETIME,
FOREIGN KEY (codCliente) REFERENCES tblCliente (codCliente)
)

CREATE TABLE tblProduto(
	codProduto			INT IDENTITY(1,1) PRIMARY KEY,
	nomeProduto			VARCHAR(50),
	precoKiloProduto	MONEY,
	codCategoriaProduto INT,
FOREIGN KEY (codCategoriaProduto) REFERENCES tblCategoriaProduto (codCategoriaProduto)
)

CREATE TABLE tblItensEncomenda(
	codItensEncomenda	INT IDENTITY(1,1) PRIMARY KEY,
	codEncomenda		INT,
	codProduto			INT,
	quantidadeKilos		FLOAT,
	subTotal			MONEY
)

-- PROCEDURES

--a)
CREATE PROCEDURE inserirCateg
	@nomeCategoriaProduto	VARCHAR(100)
AS
	INSERT INTO tblCategoriaProduto(nomeCategoriaProduto)
	VALUES
	(@nomeCategoriaProduto);


EXEC inserirCateg 'Bolo Festa'
EXEC inserirCateg 'Bolo Simples'
EXEC inserirCateg 'Torta'
EXEC inserirCateg 'Salgado'
	SELECT * FROM tblCategoriaProduto;

--b)

CREATE PROCEDURE inserirProduto
	@nomeProduto			VARCHAR(50),
	@precoKiloProduto		MONEY,
	@codCategoriaProduto	INT
AS
BEGIN
	IF EXISTS (SELECT codProduto FROM tblProduto WHERE nomeProduto LIKE @nomeProduto)
	BEGIN
		PRINT('Esse produto já existe no banco de dados')
	END
	ELSE
	BEGIN
		INSERT INTO tblProduto (nomeProduto, precoKiloProduto, codCategoriaProduto)
		VALUES
		(@nomeProduto, @precoKiloProduto, @codCategoriaProduto)
	END
END

EXEC inserirProduto 'Bolo Floresta Negra', 42.00, 1
EXEC inserirProduto 'Bolo Prestígio', 43.00, 1
EXEC inserirProduto 'Bolo Nutella', 44.00, 1
EXEC inserirProduto 'Bolo Formigueiro', 17.00, 2
EXEC inserirProduto 'Bolo de cenoura', 19.00, 2
EXEC inserirProduto 'Torta de palmito', 45.00, 3
EXEC inserirProduto 'Torta de franco e catupiry', 47.00, 3
EXEC inserirProduto 'Torta de escarola', 44.00, 3
EXEC inserirProduto 'Coxinha frango', 25.00, 4
EXEC inserirProduto 'Esfiha carne', 27.00, 4
EXEC inserirProduto 'Folhado queijo', 31.00, 4
EXEC inserirProduto 'Risoles misto', 29.00, 4

SELECT * FROM tblProduto

--c)
CREATE PROCEDURE cadastrarCliente
	@nomeCliente VARCHAR (150),
	@dataNascimentoCliente DATE,
	@ruaCliente VARCHAR(20),
	@numCasaCliente INT,
	@cepCliente VARCHAR (10),
	@bairroCliente VARCHAR (100),
	@cidadeCliente VARCHAR (100),
	@estadoCliente VARCHAR (100),
	@cpfCliente VARCHAR(14),
	@sexoCliente VARCHAR (100)
AS
BEGIN
	IF EXISTS (SELECT codCliente FROM tblCliente WHERE cpfCliente LIKE @cpfCliente)
	BEGIN
		PRINT('Cliente do cpf' +@cpfCliente+ ' já cadastrado')
	END
	ELSE IF @bairroCliente IN ('Itaquera', 'Guaianases') -- verifica se o @bairroCliente é itaquera ou guaianases
		PRINT('Não foi possível cadastrar o cliente ' +@nomeCliente+ ' pois o bairro ' +@bairroCliente+ ' não é
		atendido pela confeitaria')
	ELSE
	BEGIN
		INSERT INTO tblCliente (nomeCliente, dataNascimentoCliente, ruaCliente, numCasaCliente, cepCliente, bairroCliente, cidadeCliente, estadoCliente, cpfCliente, sexoCliente)
		VALUES
		(@nomeCliente, @dataNascimentoCliente, @ruaCliente, @numCasaCliente, @cepCliente, @bairroCliente, @cidadeCliente, @estadoCliente, @cpfCliente, @sexoCliente)
	END
END

EXEC cadastrarCliente 'Samira Fatah', '1990-05-05', 'Rua Aguapei', 1000, '08.090-000', 'Guaianases', 'São Paulo', 'SP', '111.111.111-11', 'F';
EXEC cadastrarCliente 'Celia Nogueira', '1992-06-06', 'Rua Andes', 234, '08.456-090', 'Guaianases', 'São Paulo', 'SP', '222.222.222-22', 'F';
EXEC cadastrarCliente 'Paulo Cesar Siqueira', '1984-04-04', 'Rua Castelo do Piauí', 232, '08.109-000', 'Itaquera', 'São Paulo', 'SP', '333.333.333-33', 'M';
EXEC cadastrarCliente 'Rodrigo Favaroni', '1991-04-09', 'Rua Sansão Castelo Branco', 10, '08.431-090', 'Guaianases', 'São Paulo', 'SP', '444.444.444-44', 'M';
EXEC cadastrarCliente 'Flávia Regina Brito', '1992-04-22', 'Rua Mariano Moro', 300, '08.200-123', 'Itaquera', 'São Paulo', 'SP', '555.555.555-55', 'F';

SELECT * FROM tblCliente;

--d)

--e)

--f)

--g)

--h)
