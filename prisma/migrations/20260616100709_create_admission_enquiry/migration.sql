-- CreateTable
CREATE TABLE `admission_enquiries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentName` VARCHAR(191) NOT NULL,
    `parentName` VARCHAR(191) NOT NULL,
    `classApplying` VARCHAR(191) NOT NULL,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
