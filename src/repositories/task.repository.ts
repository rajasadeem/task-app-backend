import { TaskFilters, TaskPriority, TaskStatus } from '../types';

const taskRepository = {
  add: () =>
    'INSERT INTO tasks (user_id, title, description, priority, due_date, created_at, updated_at) VALUES ($1, $2, $3, $4,$5, $6, $7) RETURNING *',

  getById: () => `SELECT * FROM tasks WHERE id = $1`,

  updateTask: (fields: Record<string, any>, id: number) => {
    fields.updated_at = new Date();

    const setClause = Object.keys(fields)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    const values = [...Object.values(fields), id];

    return {
      query: `UPDATE tasks SET ${setClause} WHERE id = $${values.length} RETURNING *`,
      values: values,
    };
  },

  deleteTask: () => `DELETE FROM tasks WHERE id = $1`,

  getTasksOfUser: (
    userId: number,
    page: number,
    pageSize: number,
    filters: TaskFilters,
  ) => {
    const offset = (page - 1) * pageSize;

    // Base query
    let query = `
      SELECT * FROM tasks
      WHERE user_id = $1
    `;

    // Add filter conditions
    const filterConditions: string[] = [];
    const values: any[] = [userId];

    if (filters.status) {
      filterConditions.push('status = $' + (values.length + 1));
      values.push(filters.status);
    }

    if (filters.priority) {
      filterConditions.push('priority = $' + (values.length + 1));
      values.push(filters.priority);
    }

    if (filters.due_date) {
      filterConditions.push('due_date = $' + (values.length + 1));
      values.push(filters.due_date); // 'YYYY-MM-DD' format
    }

    if (filterConditions.length > 0) {
      query += ' AND ' + filterConditions.join(' AND ');
    }

    query += `
      ORDER BY created_at DESC
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `;

    values.push(pageSize, offset);

    return {
      query,
      values,
    };
  },
};

export default taskRepository;
