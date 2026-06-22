-- CreateTable
CREATE TABLE `fee_structures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `className` VARCHAR(191) NOT NULL,
    `installment1` DECIMAL(10, 2) NOT NULL,
    `installment2` DECIMAL(10, 2) NOT NULL,
    `installment3` DECIMAL(10, 2) NOT NULL,
    `annualAllocation` DECIMAL(10, 2) NOT NULL,
    `totalFee` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
