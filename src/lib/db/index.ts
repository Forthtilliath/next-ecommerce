import * as downloadVerificationQueries from "./downloadVerifications";
import * as ordersQueries from "./orders";
import * as productsQueries from "./products";
import * as usersQueries from "./users";

const { remove: deleteProduct, ...products } = productsQueries;
const { remove: deleteUser, ...users } = usersQueries;
const { remove: deleteOrder, ...orders } = ordersQueries;

const db = {
	products: {
		...products,
		delete: deleteProduct,
	},
	users: {
		...users,
		delete: deleteUser,
	},
	orders: {
		...orders,
		delete: deleteOrder,
	},
	downloadVerifications: downloadVerificationQueries,
};

export default db;
