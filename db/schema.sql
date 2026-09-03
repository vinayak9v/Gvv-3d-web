-- GVV school website database schema (raw MySQL, matches src/lib/db.js / mysql2 usage).
-- Run this once against the database pointed to by MYSQL_HOST/MYSQL_USER/MYSQL_PASSWORD/MYSQL_DATABASE.
-- Table/column names intentionally match the source project's own convention exactly
-- (enquiries/fees use camelCase columns; the content tables below use snake_case).

CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `studentName` VARCHAR(191) NOT NULL,
  `parentName` VARCHAR(191) NOT NULL,
  `classApplying` VARCHAR(191) NOT NULL,
  `mobileNumber` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `message` VARCHAR(500) NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `fees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `className` VARCHAR(191) NOT NULL,
  `installment1` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `installment2` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `installment3` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `annualAllocation` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `totalFee` DECIMAL(10,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `achievements` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(191) NOT NULL,
  `category` VARCHAR(191) NOT NULL,
  `details` TEXT NOT NULL,
  `image_name` VARCHAR(191) NULL,
  `image_url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `gallery` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(191) NOT NULL,
  `category` VARCHAR(191) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `facilities` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `curriculums` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(191) NOT NULL,
  `pdf_url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `academic_calendars` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(191) NOT NULL,
  `pdf_url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `book_lists` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `classes` VARCHAR(191) NOT NULL,
  `pdf_url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `download_forms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `file_size` VARCHAR(50) NOT NULL,
  `pdf_url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Admin-uploaded replacements for hardcoded hero images on public pages.
-- `image_key` identifies the slot (e.g. "uniform_hero") — see
-- src/lib/siteImageSlots.ts. A missing row falls back to the page's
-- original built-in image.
CREATE TABLE IF NOT EXISTS `site_images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `image_key` VARCHAR(191) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_images_key_unique` (`image_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Per-page SEO overrides, edited from the admin panel's SEO section.
-- `route` is the site path (e.g. "/", "/about", "/about/introduction").
-- A missing row (or a NULL/empty column) falls back to the page's built-in
-- default title/description — see src/lib/seoPages.ts.
CREATE TABLE IF NOT EXISTS `page_seo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `route` VARCHAR(191) NOT NULL,
  `title` VARCHAR(255) NULL,
  `meta_description` VARCHAR(500) NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `page_seo_route_unique` (`route`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
