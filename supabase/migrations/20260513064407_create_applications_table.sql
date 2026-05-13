CREATE TABLE applications (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id TEXT NOT NULL,
  course_id BIGINT NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_applications_user_id ON applications (user_id);

CREATE INDEX idx_applications_course_id ON applications (course_id);

CREATE INDEX idx_applications_status ON applications (status);

CREATE TRIGGER applications_updated_at BEFORE
UPDATE ON applications FOR EACH ROW
EXECUTE FUNCTION set_updated_at ();