export const createLeadsTable = `
  CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    brand TEXT NOT NULL,
    market TEXT NOT NULL,
    spend TEXT NOT NULL,
    constraints_json TEXT NOT NULL,
    context TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )
`;
