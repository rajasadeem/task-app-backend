const userRepository = {
  add: () =>
    `INSERT INTO users (user_name, full_name, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`,

  getByUserName: () => `SELECT * FROM users WHERE user_name = $1`,

  getUserById: () => `SELECT * FROM users WHERE id = $1`,

  updateUser: (fields: Record<string, any>, id: number) => {
    fields.updated_at = new Date();

    const setClause = Object.keys(fields)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    const values = [...Object.values(fields), id];

    return {
      query: `UPDATE users SET ${setClause} WHERE id = $${values.length} RETURNING *`,
      values: values,
    };
  },

  deleteUser: () => `DELETE FROM users WHERE id = $1`,
};

export default userRepository;
