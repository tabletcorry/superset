import { isLocalOnly } from "main/env.main";
import { apiClient } from "main/lib/api-client";
import { publicProcedure, router } from "../..";

const localUser = {
	id: "local-user",
	clerkId: "local-user",
	name: "Local User",
	email: "local@localhost",
	avatarUrl: null,
	deletedAt: null,
	createdAt: new Date(),
	updatedAt: new Date(),
};

/**
 * User router - proxies to API tRPC endpoints
 */
export const createUserRouter = () => {
	return router({
		/**
		 * Get current user info
		 */
		me: publicProcedure.query(async () => {
			if (isLocalOnly) {
				return localUser;
			}
			return apiClient.user.me.query();
		}),

		myOrganizations: publicProcedure.query(async () => {
			if (isLocalOnly) {
				return [];
			}
			return apiClient.user.myOrganizations.query();
		}),
	});
};

export type UserRouter = ReturnType<typeof createUserRouter>;
