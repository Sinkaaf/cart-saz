const {Sequelize} = require("sequelize");
const sequelize = require("../config/database");

const User = require('../modules/user/models/User');
const Product = require('../modules/product/models/Product');
const Role = require('../modules/role/models/Role');
const Shipping = require('../modules/shipping/models/Shipping');
const Cart = require('../modules/cart/models/Cart');
const Payment = require('../modules/payment/models/Payment');
const Category = require('../modules/category/models/Category');
const Order = require('../modules/order/models/Order');
const Product_Category = require('../modules/product/models/Product_Category');
const ProductImage = require('../modules/product/models/ProductImage');
// const CartItem = require('../modules/cart/models/CartItem');
const OrderItem = require('../modules/order/models/OrderItem');
const verifyCode = require('../modules/user/models/VerifyCode');

//  one to many relationships: User & Role
Role.hasMany(User);
User.belongsTo(Role);

//  one to many relationships: User & Shipping
User.hasMany(Shipping);
Shipping.belongsTo(User);

//  one to many relationships: User & Order
User.hasMany(Order);
Order.belongsTo(User);

//  one to many relationships: User & Cart
User.hasMany(Cart);
Cart.belongsTo(User);

//  one to many relationships: User & Payment
User.hasMany(Payment);
Payment.belongsTo(User);

//  one to many relationships: Product & ProductImage
Product.hasMany(ProductImage);
ProductImage.belongsTo(Product);

//  one to many relationships: Category & Category
Category.hasMany(Category, {as: 'Childs', foreignKey: 'parentId'});
Category.belongsTo(Category, {as: 'Parent', foreignKey: 'parentId'});

//  super many to many relationships: Product & Category
Product.belongsToMany(Category, {through: {model:Product_Category,unique: false}});
Category.belongsToMany(Product, {through: {model:Product_Category,unique: false}});
Product.hasMany(Product_Category);
Product_Category.belongsTo(Product);
Category.hasMany(Product_Category);
Product_Category.belongsTo(Category);

//  one to many relationships: Product & Cart
Product.hasMany(Cart);
Cart.belongsTo(Product);


//  one to many relationships: Product & OrderItem
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);
//  super many to many relationships: Product & OrderItem
// Product.belongsToMany(OrderItem, {through: {model:Product_OrderItem,unique: false}});
// OrderItem.belongsToMany(Product, {through: {model:Product_OrderItem,unique: false}});
// Product.hasMany(Product_OrderItem);
// Product_OrderItem.belongsTo(Product);
// OrderItem.hasMany(Product_OrderItem);
// Product_OrderItem.belongsTo(OrderItem);


//  one to many relationships: Order & OrderItem
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

//Order & Payment
Order.hasMany(Payment);
Payment.belongsTo(Order);

//  one to many relationships: Shipping & Order
Shipping.hasMany(Order);
Order.belongsTo(Shipping);

