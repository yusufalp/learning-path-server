CREATE TABLE application_answers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  application_id BIGINT NOT NULL REFERENCES applications (id) ON DELETE CASCADE,
  question_id BIGINT NOT NULL REFERENCES application_questions (id) ON DELETE CASCADE,
  answer_text TEXT,
  answer_json JSONB,
  question_snapshot JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_application_question UNIQUE (application_id, question_id)
);

CREATE INDEX idx_application_answers_application_id ON application_answers (application_id);

CREATE INDEX idx_application_answers_question_id ON application_answers (question_id);

CREATE TRIGGER application_answers_updated_at BEFORE
UPDATE ON application_answers FOR EACH ROW
EXECUTE FUNCTION set_updated_at ();