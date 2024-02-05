export const authController = {
	GET: async (req, res) => {
		res.json(req.user);
	},
};
