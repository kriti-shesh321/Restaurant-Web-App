'use strict';

module.exports = {
    async up(queryInterface) {
        const [constraints] = await queryInterface.sequelize.query(`
            SELECT DISTINCT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_SCHEMA = DATABASE()
              AND TABLE_NAME = 'Orders'
              AND COLUMN_NAME = 'deliveryAddressId'
              AND REFERENCED_TABLE_NAME = 'DeliveryAddresses'
              AND CONSTRAINT_NAME <> 'PRIMARY';
        `);

        // Remove every existing FK on deliveryAddressId.
        // We do this dynamically because MySQL-generated constraint
        // names can differ between environments.
        for (const constraint of constraints) {
            const constraintName = constraint.CONSTRAINT_NAME;

            await queryInterface.sequelize.query(`
                ALTER TABLE Orders
                DROP FOREIGN KEY \`${constraintName}\`;
            `);
        }

        // Make deliveryAddressId nullable.
        await queryInterface.sequelize.query(`
            ALTER TABLE Orders
            MODIFY COLUMN deliveryAddressId INT NULL;
        `);

        // Add one explicitly named FK.
        await queryInterface.sequelize.query(`
            ALTER TABLE Orders
            ADD CONSTRAINT Orders_deliveryAddressId_fk
            FOREIGN KEY (deliveryAddressId)
            REFERENCES DeliveryAddresses(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);
    },

    async down(queryInterface) {
        await queryInterface.sequelize.query(`
            ALTER TABLE Orders
            DROP FOREIGN KEY Orders_deliveryAddressId_fk;
        `);

        await queryInterface.sequelize.query(`
            ALTER TABLE Orders
            MODIFY COLUMN deliveryAddressId INT NOT NULL;
        `);

        await queryInterface.sequelize.query(`
            ALTER TABLE Orders
            ADD CONSTRAINT Orders_deliveryAddressId_fk
            FOREIGN KEY (deliveryAddressId)
            REFERENCES DeliveryAddresses(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);
    },
};