import { isLocalOnly } from "main/env.main";
import { apiClient } from "main/lib/api-client";
import { publicProcedure, router } from "../..";

const localUser = {
	id: "local-user",
	name: "Local User",
	email: "local@localhost",
	emailVerified: true,
	image: null,
	createdAt: new Date(),
	updatedAt: new Date(),
};

const localOrganization = {
	id: "local-org",
	name: "Local Workspace",
	slug: "local",
	logo: null,
	createdAt: new Date(),
	metadata: null,
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
				return [localOrganization];
			}
			return apiClient.user.myOrganizations.query();
		}),
	});
};

export type UserRouter = ReturnType<typeof createUserRouter>;
