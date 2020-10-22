create  database PackXprez

DROP TABLE IF EXISTS Branches
DROP TABLE IF EXISTS Package
DROP TABLE IF EXISTS [Address]
DROP TABLE IF EXISTS Customer
CREATE TABLE Customer
(
	[CustId] INT PRIMARY KEY IDENTITY(1,1),
	[Name] varchar(50) check([Name] not like'%[^A-Za-z ]%' ) not null,
	[EmailId] varchar(50) check([EmailID] like '%_@__%.__%'),
	[Password] varchar(16) not null check(len(Password)>=8),
	ContactNo BIGINT unique CHECK(LEN(ContactNo)=10) NOT NULL
)

insert into  Customer values('xyz','xyzn@gmail.com','app@123456',9743051534)
insert into  Customer values('Ankit','ankyrocx@gmail.com','lak@1236556',7974209562)
insert into  Customer values('Rohit','Rkjha@gmail.com','jha@523456',9875654265)
insert into  Customer values('Vaibhav','vg@gmail.com','vg@123456',9879995887)
insert into  Customer values('Swetha','swetha@gmail.com','swetha@1111',9879995888)
insert into Customer values('Pawan','pawan@gmail.com','pawan@1111',9234595497)
insert into Customer values('James','abc@gmail.com','cooldude@69',8127046610);
INSERT INTO Customer VALUES ('Tushita','tushita@gmail.com','tush@1111',9879995497);
INSERT INTO Customer VALUES('Ahana','ahana@infy.com','Ahana@122', 1677565364); 
insert into  Customer values('Jawahar','jawa@gmail.com','jawa@1111',9839995497)
insert into Customer values('Shubham','shubh@gmail.com','shubh@1111',9777995497)
insert into Customer values('Tansy','tansy@gmail.com','tansy@1111',9823995497)
INSERT INTO Customer VALUES('Rashmi','rashmi@infy.com', 'Rashi@122', 1324353464); 

--select * from Customer


CREATE TABLE [Address](
	
	AddressNo INT PRIMARY KEY IDENTITY(1001,1),
	[BuildingNo] varchar(50) check([BuildingNo] not like'%[^A-Za-z0-9 ]%' ) not null,
	[StreetNo] varchar(50) check([StreetNo] not like'%[^A-Za-z0-9 ]%' ) not null,
	[Locality] VARCHAR(20) check([Locality] not like'%[^A-Za-z ]%' ) not null,
	[Pincode] numeric(6) check(len([PinCode])=6 and Pincode not like '0%'),
	CustId INT REFERENCES Customer(CustId) NOT NULL,
	 
)
go


insert into  [Address] values('ECC92','MYS22', 'Infy FIESTA',570021,1)
insert into  [Address] values('ECC92','MYS22', 'Infy FIESTA',570021,2)
insert into [Address] values('ECC56','MYS22', 'INFOSYSCampus OASIS',570026,3)
INSERT INTO [Address] VALUES('ECC56','MYS22', 'INFOSYSCampus OASIS',570026,4);
INSERT INTO [Address] VALUES ('ECC79','MYS11', 'INFOSYS ECC',570027,5);
INSERT INTO [Address] VALUES('ECC79','MYS11', 'INFOSYS ECC',570027,6);
insert into  [Address] values('ECC56','MYS22', 'INFOSYSCampus OASIS',570026,7)
insert into [Address] values('ECC56','MYS22', 'INFOSYSCampus OASIS',570026,8)
insert into [Address] values('ECC56','MYS22', 'INFOSYSCampus OASIS',570026,9)
INSERT INTO [Address] VALUES('ECC92','MYS22', 'Infy FIESTA',570021,10);

--select * from Address

CREATE TABLE ServiceLocations
(
 [PickupPincode] NUMERIC(6),
 [DeliveryPincode] NUMERIC(6),
 [DistanceInKMS] NUMERIC(4)
)

insert into ServiceLocations values(570021,210201,500)
insert into ServiceLocations values(570021,210202,400)
insert into ServiceLocations values(570021,210203,300)
insert into ServiceLocations values(570021,210204,200)

insert into ServiceLocations values(570026,210201,400)
insert into ServiceLocations values(570026,210202,300)
insert into ServiceLocations values(570026,210203,200)
insert into ServiceLocations values(570026,210204,100)

insert into ServiceLocations values(570027,210201,700)
insert into ServiceLocations values(570027,210202,500)
insert into ServiceLocations values(570027,210203,300)
insert into ServiceLocations values(570027,210204,100)

GO




CREATE TABLE Package(
	AWBNumber BIGINT IDENTITY(12345678901,1) PRIMARY KEY NOT NULL,
	CustId INT REFERENCES Customer(CustId) NOT NULL,
	ShipmentType VARCHAR(10) NOT NULL CHECK(ShipmentType in ('Heavy','Perishable','Fragile')),
	PackageLength INT NOT NULL,
	PackageBreadth INT NOT NULL,
	PackageHeight INT NOT NULL,
	PackageWeight INT NOT NULL,
	Packaging BIT NOT NULL,
	DeliveryOption VARCHAR(10) NOT NULL CHECK(DeliveryOption in('Overnight','Express','Standard')),
	PickupTime DATE NOT NULL,
	InsuranceApplied BIT NOT NULL,
	SourceAddress VARCHAR(100) NOT NULL,
	DestinationAddress VARCHAR(100) NOT NULL,
	ContactNo BIGINT NOT NULL,
	Cost DECIMAL(8,2) NOT NULL,
	[Status] VARCHAR(10) CHECK([Status] IN ('IN TRANSIT', 'SUCCESS', 'FAILED'))
)
--insert into Package values(1, 'Perishable', 10, 4, 5, 3, 1, 'Express', DateTime.Now.Date, '10, 2, Surya Nagar, U.P 201011', 4, 2, "Bangalore, Karnataka", 560087, 8722457632);
CREATE TABLE Branches(
	BranchId INT primary key IDENTITY(100,1) NOT NULL,
	Pincode INT CHECK(Len(Pincode)=6 AND Pincode>=100000) NOT NULL
)
insert into Branches values(570021);
insert into Branches values(570026);
insert into Branches values(570027);
insert into Branches values(324001);
insert into Branches values(324007);
insert into Branches values(324006);
insert into Branches values(201011);
insert into Branches values(110092);


---------------------------------------------------------------
----------------STORED PROCEDURES
---------------------------------------------------------------


DROP PROCEDURE IF EXISTS usp_AddCustomer
GO
creAte PROCEDURE usp_AddCustomer(
	@NAME VARCHAR(30),
	@EmailId VARCHAR(30),
	@Password VARCHAR(16),
	@ContactNo BIGINT,
	@BuildingNo varchaR(50),
	@StreetNo  varchaR(50),
	@Locality VARCHAR(20),
	@Pincode INT
)
AS
BEGIN
	BEGIN TRY
		DECLARE @CustId INT
		If(@Name Is NULL AND @NAME NOT LIKE '%[A-Za-z ]%')
			Return -1
		ELSE IF EXISTS(SELECT EmailId FROM Customer WHERE EmailId=@EmailId)
			RETURN -9
		ELSE IF(@EmailId IS NULL OR @EmailId NOT LIKE '%_@__%.__%')
			RETURN -2
        ELSE IF(@Password IS NULL OR LEN(@Password)<8 OR LEN(@Password)>16)
			RETURN -3
		ELSE IF(@ContactNo IS NULL OR LEN(@ContactNo)!=10)
			RETURN -4
		ELSE IF(@BuildingNo IS NULL and @BuildingNo NOT LIKE '%[A-Za-z0-9 ]%' )
			RETURN -5
		ELSE IF(@StreetNo IS NULL and @StreetNo NOT LIKE '%[A-Za-z0-9 ]%')
			RETURN -6
		ELSE IF(@Locality IS NULL and @Locality NOT LIKE '%[A-Za-z ]%')
			RETURN -7
		ELSE IF(@Pincode IS NULL OR LEN(@Pincode)!=6 OR @Pincode<100000)
			RETURN -8
        ELSE
			BEGIN
				INSERT INTO Customer VALUES(@NAME, @EmailId, @Password, @ContactNo)
				SET @CustId = IDENT_CURRENT('Customer')
				INSERT INTO [Address] VALUES(@BuildingNo, @StreetNo, @Locality, @Pincode,@CustId)
				RETURN 1
			END             
	END TRY
	BEGIN CATCH
		RETURN -99
	END CATCH 
END
go
DROP PROCEDURE IF EXISTS usp_AddAddress
GO
CREATE PROCEDURE usp_AddAddress(
	@CustId int,
	@BuildingNo vARCHAR(50),
	@StreetNo varchar(50),
	@Locality VARCHAR(20),
	@Pincode INT
)
AS
BEGIN
	BEGIN TRY
		IF not EXISTS(SELECT CustId FROM Customer  WHERE CustId=@CustId)
			return -5
		else IF(@BuildingNo IS NULL and @BuildingNo NOT LIKE '%[A-Za-z0-9 ]%')
			RETURN -1
		ELSE IF(@StreetNo IS NULL and @StreetNo NOT LIKE '%[A-Za-z0-9 ]%')
			RETURN -2
		ELSE IF(@Locality IS NULL and @Locality NOT LIKE '%[A-Za-z ]%')
			RETURN -3
		ELSE IF(@Pincode IS NULL OR LEN(@Pincode)!=6 OR @Pincode<100000)
			RETURN -4
		ELSE
			BEGIN
			INSERT INTO [Address] VALUES(@BuildingNo, @StreetNo, @Locality, @Pincode,@CustId)
			RETURN 1
			END
	END TRY
	BEGIN CATCH
		RETURN -99
	END CATCH
END
go
DROP PROCEDURE IF EXISTS usp_ValidateCustomer
GO
CREATE PROCEDURE usp_ValidateCustomer(
	@EmailId VARCHAR(30),
	@Password VARCHAR(16)
)
AS 
BEGIN
	BEGIN TRY
		IF(@EmailId IS NULL OR @EmailId NOT LIKE '%_@__%.__%')
			RETURN -1
		ELSE IF(@Password IS NULL OR LEN(@Password)<8 OR LEN(@Password)>16)
			RETURN -2
		ELSE IF NOT EXISTS(SELECT EmailId FROM Customer WHERE EmailId=@EmailId AND Password=@Password)
			RETURN -3
		ELSE
			RETURN 1

	END TRY
	BEGIN CATCH
		RETURN -99
	END CATCH
END
go
DROP PROCEDURE IF EXISTS usp_CheckAvailability
GO
create PROCEDURE usp_CheckAvailability(
	@SenderPincode INT,
	@ReceiverPincode INT
)
AS
BEGIN 
	IF NOT EXISTS(SELECT Pincode FROM Branches WHERE Pincode=@SenderPincode) or
		NOT EXISTS(SELECT Pincode FROM Branches WHERE Pincode=@ReceiverPincode)
		RETURN -1
	ELSE
		RETURN 1
END
go
 
go
DROP PROCEDURE IF EXISTS usp_AddPackage
GO
create PROCEDURE usp_AddPackage(
	@CustId INT,
	@ShipmentType VARCHAR(10),
	@Length INT,
	@Breadth INT,
	@Height INT,
	@Weight INT,
	@Packaging BIT,
	@DeliveryOption VARCHAR(10),
	@PickupTime DATE,
	@SourceAddress VARCHAR(20), 
	@ReceiversBuildingNo varchar(50),
	@ReceiversStreetNo varchar(50),
	@ReceiversLocality VARCHAR(20),
	@ReceiversPinCode INT,
	@ReceiversContactNo BIGINT
)
AS
BEGIN
BEGIN TRY
	Declare @destinationAddress VARCHAR(100), @insurance bit, @amount decimal(8,2)=200
	IF(@ShipmentType NOT IN ('Heavy','Perishable','Fragile'))
		RETURN -1
	ELSE IF(@DeliveryOption NOT IN ('Overnight','Express','Standard'))
		RETURN -2
	ELSE
		BEGIN
			IF(@DeliveryOption='Overnight')
				SET @amount+=500
			ELSE IF(@DeliveryOption='Express')
				SET @amount+=100

			IF(@Packaging=1)
				set @amount+=500;

			IF(@Weight>5)
				set @amount+=@Weight*50

			IF(@Length*@Breadth*@Height>100)
				set @amount+=(@Length*@Breadth*@Height)*50

			if(@amount>=1000)
				set @insurance=1

			SET @destinationAddress = cast(@ReceiversBuildingNo as varchar)+', '+cast(@ReceiversStreetNo as varchar)+', '+@ReceiversLocality+', '
			+cast(@ReceiversPincode as varchar)
			select @destinationAddress
			
			INSERT INTO Package VALUES(@CustId, @ShipmentType, @Packaging, @DeliveryOption, @PickupTime,@insurance,
			@SourceAddress, @destinationAddress,@ReceiversContactNo, @amount, 'IN TRANSIT')

			RETURN 1
		END
END TRY
BEGIN CATCH
	RETURN -99
END CATCH
END
go
DROP PROCEDURE IF EXISTS usp_UpdateStatus
GO
CREATE PROCEDURE usp_UpdateStatus(
	@AWBNumber BIGINT,
	@Status VARCHAR(10)
)
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS(SELECT AWBNumber FROM Package WHERE AWBNumber=@AWBNumber)
			RETURN -1
		ELSE
			BEGIN
			UPDATE Package SET [Status]=@Status WHERE AWBNumber=@AWBNumber
			RETURN 1
			END
	END TRY
	BEGIN CATCH
		RETURN -99
	END CATCH 
END
go

--declare @ans int
--exec @ans = usp_AddPackage 1,'Perishable', 10, 4, 5, 3, 1, 'Express', '2012-01-01', '10, 2, Surya Nagar, U.P ', 4,2 , 'Bangalore, Karnataka', 560087, 8722457632
--select @ans

---------------------------------------------------------------
----------------Functions
---------------------------------------------------------------

DROP FUNCTION IF EXISTS ufn_TrackPackage
GO
CREATE FUNCTION ufn_TrackPackage(
	@AWBNumber BIGINT
)
RETURNS TABLE
AS
RETURN SELECT AWBNumber, SourceAddress, DestinationAddress, [Status] FROM Package where AWBNumber=@AWBNumber

GO
DROP FUNCTION IF EXISTS ufn_PackageHistory
go
CREATE FUNCTION ufn_PackageHistory(
	@CustId INT
)
RETURNS TABLE
AS
RETURN SELECT AWBNumber, SourceAddress, DestinationAddress, [Status] FROM Package WHERE CustId=@CustId