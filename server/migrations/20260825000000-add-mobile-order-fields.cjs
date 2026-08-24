'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Orders', 'orderType', {
            type: Sequelize.ENUM('delivery', 'dine-in'),
            allowNull: false,
            defaultValue: 'delivery',
            after: 'isGuest',
        });

        await queryInterface.addColumn('Orders', 'tableNumber', {
            type: Sequelize.STRING(50),
            allowNull: true,
            after: 'deliveryAddressId',
        });

        await queryInterface.changeColumn('Orders', 'deliveryAddressId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'DeliveryAddresses',
                key: 'id',
            },
            onDelete: 'CASCADE',
        });

        await queryInterface.sequelize.query(`
            ALTER TABLE Orders
            MODIFY COLUMN status ENUM(
                'Pending',
                'Confirmed',
                'Preparing Order',
                'Ready',
                'Out for Delivery',
                'Served',
                'Delivered',
                'Cancelled'
            ) DEFAULT 'Pending'
            `);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
            ALTER TABLE Orders
            MODIFY COLUMN status ENUM(
                'Pending',
                'Confirmed',
                'Preparing Order',
                'Out for Delivery',
                'Delivered',
                'Cancelled'
            ) DEFAULT 'Pending'
            `);

        await queryInterface.changeColumn('Orders', 'deliveryAddressId', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'DeliveryAddresses',
                key: 'id',
            },
            onDelete: 'CASCADE',
        });

        await queryInterface.removeColumn('Orders', 'tableNumber');
        await queryInterface.removeColumn('Orders', 'orderType');

        await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS enum_Orders_orderType
    `);
    },
};