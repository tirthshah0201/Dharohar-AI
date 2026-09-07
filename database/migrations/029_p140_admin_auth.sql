-- P1.40: Admin Username + Password Authentication
-- Add role column to users table

-- Add role column with default 'user'
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'user';

-- Add check constraint for valid roles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'users_role_check'
  ) THEN
    ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('user', 'admin'));
  END IF;
END $$;

-- Create index for admin lookups
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Add comment
COMMENT ON COLUMN users.role IS 'User role: user (default) or admin';
