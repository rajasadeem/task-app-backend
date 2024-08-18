/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createType('task_status', ['to_do', 'in_progress', 'completed']);
  pgm.createType('task_priority', ['low', 'medium', 'high']);

  pgm.createTable(
    'tasks',
    {
      id: { type: 'BIGSERIAL', primaryKey: true },
      user_id: {
        type: 'BIGINT',
        notNull: true,
        references: '"users"',
        onDelete: 'CASCADE',
      },
      title: { type: 'VARCHAR(255)', notNull: true },
      description: { type: 'TEXT' },
      status: { type: 'task_status', notNull: true, default: 'to_do' },
      priority: { type: 'task_priority', notNull: true, default: 'medium' },
      due_date: { type: 'DATE' },
      created_at: {
        type: 'TIMESTAMP',
        notNull: true,
        default: pgm.func('current_timestamp'),
      },
      updated_at: {
        type: 'TIMESTAMP',
        notNull: true,
        default: pgm.func('current_timestamp'),
      },
      completed_at: { type: 'TIMESTAMP' },
    },
    {
      ifNotExists: true,
    },
  );

  pgm.createIndex('tasks', 'user_id');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  // Drop tasks table
  pgm.dropTable('tasks');

  // Drop ENUM types
  pgm.dropType('task_status');
  pgm.dropType('task_priority');
};
