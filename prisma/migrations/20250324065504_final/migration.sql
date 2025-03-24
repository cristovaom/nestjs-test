BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[tb_users] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    [email] VARCHAR(255) NOT NULL,
    [password] VARCHAR(255) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL CONSTRAINT [tb_users_role_df] DEFAULT 'CLIENT',
    [created_at] DATETIME2 NOT NULL CONSTRAINT [tb_users_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    CONSTRAINT [tb_users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [tb_users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[tb_stores] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    [owner_id] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [tb_stores_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    [secret_key] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [tb_stores_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [tb_stores_owner_id_key] UNIQUE NONCLUSTERED ([owner_id])
);

-- CreateTable
CREATE TABLE [dbo].[tb_products] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [price] DECIMAL(10,2) NOT NULL,
    [stock] INT NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [tb_products_status_df] DEFAULT 'ACTIVE',
    [store_id] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [tb_products_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    CONSTRAINT [tb_products_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tb_orders] (
    [id] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [store_id] NVARCHAR(1000) NOT NULL,
    [total_price] DECIMAL(10,2) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [tb_orders_status_df] DEFAULT 'PENDING',
    [created_at] DATETIME2 NOT NULL CONSTRAINT [tb_orders_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    CONSTRAINT [tb_orders_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tb_order_items] (
    [id] NVARCHAR(1000) NOT NULL,
    [order_id] NVARCHAR(1000) NOT NULL,
    [product_id] NVARCHAR(1000) NOT NULL,
    [quantity] INT NOT NULL,
    [price] DECIMAL(10,2) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [tb_order_items_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2,
    CONSTRAINT [tb_order_items_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[tb_stores] ADD CONSTRAINT [tb_stores_owner_id_fkey] FOREIGN KEY ([owner_id]) REFERENCES [dbo].[tb_users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tb_products] ADD CONSTRAINT [tb_products_store_id_fkey] FOREIGN KEY ([store_id]) REFERENCES [dbo].[tb_stores]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[tb_orders] ADD CONSTRAINT [tb_orders_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[tb_users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tb_orders] ADD CONSTRAINT [tb_orders_store_id_fkey] FOREIGN KEY ([store_id]) REFERENCES [dbo].[tb_stores]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tb_order_items] ADD CONSTRAINT [tb_order_items_order_id_fkey] FOREIGN KEY ([order_id]) REFERENCES [dbo].[tb_orders]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tb_order_items] ADD CONSTRAINT [tb_order_items_product_id_fkey] FOREIGN KEY ([product_id]) REFERENCES [dbo].[tb_products]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
