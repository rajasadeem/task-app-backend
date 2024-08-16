const userRepository = {
  add: () => {
    return `INSERT INTO users (user_name, full_name, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  },
  getByUserName: () => {
    return `SELECT * FROM users WHERE user_name = $1`;
  },
  getUserById: () => {
    return `SELECT * FROM users WHERE id = $1`;
  },
  updateUser: (fields: Record<string, any>, id: number) => {
    // Add updated_at field with the current timestamp
    fields.updated_at = new Date();

    const setClause = Object.keys(fields)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    const values = [...Object.values(fields), id];

    return {
      text: `UPDATE users SET ${setClause} WHERE id = $${values.length} RETURNING *`,
      values: values,
    };
  },

  deleteUser: () => {
    return `DELETE FROM users WHERE id = $1`;
  },
};

export default userRepository;
