-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `like_ibfk_1`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `like_ibfk_2`;

-- CreateIndex
CREATE INDEX `Like_postId_fkey` ON `like`(`postId`);

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `Like_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RedefineIndex
CREATE UNIQUE INDEX `_posttag_AB_unique` ON `_posttag`(`A`, `B`);
DROP INDEX `_PostTag_AB_unique` ON `_posttag`;

-- RedefineIndex
CREATE INDEX `_posttag_B_index` ON `_posttag`(`B`);
DROP INDEX `_PostTag_B_index` ON `_posttag`;

-- RedefineIndex
CREATE UNIQUE INDEX `like_postId_userId_key` ON `like`(`postId`, `userId`);
DROP INDEX `Like_postId_userId_key` ON `like`;

-- RedefineIndex
CREATE INDEX `Like_userId_fkey` ON `like`(`userId`);
DROP INDEX `userId` ON `like`;
