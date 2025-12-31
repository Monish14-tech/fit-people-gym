const { sequelize, DataTypes } = require('../config/db');

const Testimonial = sequelize.define('Testimonial', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'Member'
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Testimonial;
