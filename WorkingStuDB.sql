CREATE DATABASE srh_05;
use srh_05;

-- Overview table of all employees	OPTIONAL
-- Employee/User details			DONE
-- Login/SignUp/User credentials	DONE
-- working hours table
-- Tax deducted table
-- Company Details					DONE


-- User Credentials
CREATE TABLE userCredentials(
user_id INT(10) AUTO_INCREMENT,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
age INT(10) NOT NULL,
university VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
user_password VARCHAR(100),
current_status VARCHAR(20) DEFAULT 'Active',
isAdmin VARCHAR(20) DEFAULT 'false',
working_hours INT(20) DEFAULT 960,
PRIMARY KEY(user_id)
);
ALTER TABLE userCredentials AUTO_INCREMENT = 10000;


-- Company Details. //Create triggers to enter income tax detail and working_status detail
CREATE TABLE companyDetails(
user_id INT(10) NOT NULL,
company_name VARCHAR(60) NOT NULL,
type_of_work ENUM('Working Student', 'Part Time', 'Internship'),
start_date DATE,
end_date DATE default null,
working_status VARCHAR(20) DEFAULT 'Active',
gross_salary INT(10) DEFAULT 0,
income_tax_bracket ENUM('Cat01', 'Cat05') DEFAULT 'Cat01',
INDEX `idx_user_id_companyDetails` (user_id),
CONSTRAINT `fk_user_id_companyDetails` FOREIGN KEY(user_id) REFERENCES userCredentials(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);


-- Working hours tables
CREATE TABLE workingHours(
user_id INT(10) NOT NULL,
company_name VARCHAR(60) NOT NULL,
worked_date DATE,
worked_week INT(4),
worked_month INT(4),
hours_worked INT(4),
INDEX `idx_user_id_workingHours` (user_id),
CONSTRAINT `fk_user_id_workingHours` FOREIGN KEY(user_id) REFERENCES userCredentials(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);




/*
-- Trigger 1 -- To enter income tax details -- Moved the same logic into Node
DROP TRIGGER IF EXISTS srh_05.incomeTaxCategory;
DELIMITER //
CREATE TRIGGER srh_05.incomeTaxCategory
BEFORE INSERT ON companyDetails FOR EACH ROW
BEGIN
DECLARE Tri_userID INT(10);
DECLARE companyCount INT(10);
SET Tri_userID = new.user_id;
SELECT count(*) INTO companyCount FROM companyDetails WHERE user_id = Tri_userID and 
working_status = 'Active' and income_tax_bracket = 'Cat01';
IF companyCount >= 1 THEN
	SET new.income_tax_bracket = 'Cat05';
ELSE
    SET new.income_tax_bracket = 'Cat01';
END IF;

END //
DELIMITER ;
*/

/*
-- Trigger 2 -- To enter working status details -- Moved the same logic into Node
DROP TRIGGER IF EXISTS srh_05.workingStatusUpdate;
DELIMITER //
CREATE TRIGGER srh_05.workingStatusUpdate
BEFORE UPDATE ON companyDetails FOR EACH ROW
workingStUpdate: BEGIN
DECLARE Tri_userID INT(10);
DECLARE Tri_endDate DATE;
DECLARE Tri_companyName VARCHAR(60);
DECLARE endCount INT(10);

SET Tri_userID = new.user_id;
SET Tri_endDate = new.end_date;
SET Tri_companyName = new.company_name;
SELECT count(*) INTO endCount FROM companyDetails WHERE user_id = Tri_userID 
and company_name = Tri_companyName and Tri_endDate IS NOT NULL;

IF endCount > 0 THEN
	SET new.working_status = 'Inactive';
END IF;


END //
DELIMITER ;
*/


-- Trigger 3 -- To calculate tax deductions


/* 
-- Trigger 4 -- To make sure atleast one 'Cat01' is present [DOESN'T WORK] -- Moved the same logic into Node
DROP TRIGGER IF EXISTS srh_05.atleastOneCat01Row;
DELIMITER //
CREATE TRIGGER srh_05.atleastOneCat01Row
AFTER UPDATE on companyDetails FOR EACH ROW
incomeTaxBracketUpdate: BEGIN
DECLARE Tri_userID INT(10);
DECLARE Tri_endDate DATE;
DECLARE catOneRowCount INT(5);
SET Tri_userID = new.user_id;
SET Tri_endDate = new.end_date;
SELECT COUNT(*) INTO catOneRowCount FROM companyDetails WHERE user_id = Tri_userID 
and working_status = 'Active' and income_tax_bracket = 'Cat01';


IF catOneRowCount = 0 THEN
	UPDATE companyDetails SET income_tax_bracket = 'Cat01' WHERE user_id = Tri_userID 
    and working_status = 'Active' ORDER BY start_date limit 1;
END IF;

END //
DELIMITER ;
*/

-- Event Schedule
SET GLOBAL event_scheduler = ON;

CREATE EVENT reset_working_hours
ON SCHEDULE EVERY 1 YEAR
STARTS '2023-12-31 23:59:59'
DO
UPDATE userCredentials SET working_hours = 960;
