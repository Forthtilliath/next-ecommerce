import * as ordersQueries from "./orders";
import * as productsQueries from "./products";
import * as usersQueries from "./users";

const { remove: removeProduct, ...products } = productsQueries;

const db = {
	products: {
		...products,
		delete: removeProduct,
	},
	users: usersQueries,
	orders: ordersQueries,
};

export default db;
