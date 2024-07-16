const { DataTypes } = require('sequelize');
const sequelize = require("../database.js");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(72),
        allowNull: false,
    },
    dateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date_created',
    },
    premium: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    remainingGenerations: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        field: 'remaining_generations',
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    tableName: 'users',
    timestamps: false,
});

const Feedback = sequelize.define('Feedback', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    dateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date_created',
    },
}, {
    tableName: 'feedback',
    timestamps: false,
});

const JobInput = sequelize.define('JobInput', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    personalInfo: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'personal_info',
    },
    jobInfo: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'job_info',
    },
    requiredSections: {
        type: DataTypes.STRING(400),
        allowNull: false,
        field: 'required_sections',
    }
}, {
    tableName: 'job_input',
    timestamps: false,
});

const JobOutput = sequelize.define('JobOutput', {
    job: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    output: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    model: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    tone: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    mode: {
        type: DataTypes.SMALLINT,
        allowNull: true   
    }
}, {
    tableName: 'job_output',
    timestamps: false,
});

const Settings = sequelize.define('Settings', {
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        field: 'user_id',
    },
    tone: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    copyPersonalInfo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'copy_personal_info',
    },
    model: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    generateMode: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        field: 'generate_mode',
    },
}, {
    tableName: 'settings',
    timestamps: false,
});

const Testimonials = sequelize.define('Testimonials', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    comment: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    dateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date_created',
    },
}, {
    tableName: 'testimonials',
    timestamps: false,
});

// Define associations
User.hasMany(Feedback, { foreignKey: 'user_id' });
Feedback.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(JobInput, { foreignKey: 'user_id' });
JobInput.belongsTo(User, { foreignKey: 'user_id' });

JobInput.hasMany(JobOutput, { foreignKey: 'job' });
JobOutput.belongsTo(JobInput, { foreignKey: 'job' });

User.hasOne(Settings, { foreignKey: 'user_id' });
Settings.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Testimonials, { foreignKey: 'user_id' });
Testimonials.belongsTo(User, {foreignKey: 'user_id' })

module.exports = {
    User,
    Feedback,
    JobInput,
    JobOutput,
    Settings,
    Testimonials
};