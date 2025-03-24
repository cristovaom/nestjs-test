/*
  Warnings:

  - You are about to drop the `tb_order_items` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[tb_order_items] DROP CONSTRAINT [tb_order_items_order_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[tb_order_items] DROP CONSTRAINT [tb_order_items_product_id_fkey];

-- DropTable
DROP TABLE [dbo].[tb_order_items];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
