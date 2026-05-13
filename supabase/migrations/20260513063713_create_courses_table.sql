CREATE TABLE IF NOT EXISTS courses (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  department TEXT,
  instructor_name TEXT,
  location TEXT,
  delivery_method TEXT,
  -- online, hybrid, in_person
  status TEXT NOT NULL DEFAULT 'draft',
  -- draft, published, archived
  capacity INTEGER,
  price_cents INTEGER,
  currency TEXT DEFAULT 'USD',
  application_open_at TIMESTAMPTZ,
  application_close_at TIMESTAMPTZ,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses (slug);

CREATE INDEX IF NOT EXISTS idx_courses_status ON courses (status);

CREATE INDEX IF NOT EXISTS idx_courses_department ON courses (department);

CREATE INDEX IF NOT EXISTS idx_courses_is_public ON courses (is_public);

CREATE INDEX IF NOT EXISTS idx_courses_application_open_at ON courses (application_open_at);

CREATE INDEX IF NOT EXISTS idx_courses_application_close_at ON courses (application_close_at);

CREATE TRIGGER courses_updated_at BEFORE
UPDATE ON courses FOR EACH ROW
EXECUTE FUNCTION set_updated_at ();