CREATE TABLE application_questions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  section_id BIGINT REFERENCES application_sections (id) ON DELETE CASCADE,
  key VARCHAR(100) UNIQUE NOT NULL,
  label TEXT NOT NULL,
  help_text TEXT,
  question_type application_question_type NOT NULL,
  is_required BOOLEAN NOT NULL DEFAULT FALSE,
  placeholder TEXT,
  validation_rules JSONB,
  options JSONB,
  conditional_logic JSONB,
  version INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_application_questions_section_id ON application_questions (section_id);

CREATE INDEX idx_application_questions_active ON application_questions (is_active);

CREATE INDEX idx_application_questions_question_type ON application_questions (question_type);