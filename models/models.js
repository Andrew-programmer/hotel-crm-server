const sequelize = require('../db');
const {DataTypes} = require('sequelize');


const Worker = sequelize.define('worker', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    salary: {type: DataTypes.INTEGER},
    photo: {type: DataTypes.STRING, unique: true},
    hired_date: {type: DataTypes.INTEGER},
    fired_date: {type: DataTypes.INTEGER},
    passport_number: {type: DataTypes.INTEGER, unique: true}
});

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true}
});

const WorkerStatus = sequelize.define('worker_status', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    color: {type: DataTypes.STRING}
});

const Hotel = sequelize.define('hotel', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    reception_phone: {type: DataTypes.STRING, unique: true, allowNull: false},
    staff: {type: DataTypes.ARRAY, allowNull: false},
    director_id: {type: DataTypes.INTEGER, unique: true, allowNull: false},
    budget: {type: DataTypes.INTEGER, allowNull: false }
})

const Guest = sequelize.define('guest', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    arrive_date: {type: DataTypes.INTEGER},
    leave_date: {type: DataTypes.INTEGER},
    passport_number: {type: DataTypes.INTEGER, unique: true}
});

const RoomStatus = sequelize.define('room_status', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    color: {type: DataTypes.STRING}
});

const Room = sequelize.define('room', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    place: {type: DataTypes.INTEGER, allowNull: false},
    number: {type: DataTypes.INTEGER}
});

const Rank = sequelize.define('rank', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
});

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
});

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
});

const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    serial: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER},
    name: {type: DataTypes.STRING, allowNull: true},
    buy_date: {type: DataTypes.INTEGER, allowNull: false},
    expiration_date: {type: DataTypes.INTEGER, allowNull: false},
    end_date: {type: DataTypes.INTEGER, allowNull: false}
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, {through: TypeBrand});
Brand.belongsToMany(Type, {through: TypeBrand});

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    DeviceInfo,
}
