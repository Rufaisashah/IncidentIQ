
CREATE TABLE IF NOT EXISTS incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title VARCHAR(200) NOT NULL,
    application_name VARCHAR(150) NOT NULL,

    platform VARCHAR(30) NOT NULL
      CHECK (platform IN ('Azure', 'Render', 'Netlify', 'Other')),

    environment VARCHAR(30) NOT NULL DEFAULT 'development'
      CHECK (environment IN (
        'development', 'staging', 'production'
      )),

    description TEXT,

    severity VARCHAR(20) NOT NULL DEFAULT 'medium'
      CHECK (severity IN ('low', 'medium', 'high', 'critical')),

    status VARCHAR(20) NOT NULL DEFAULT 'open'
      CHECK (status IN (
        'open', 'investigating', 'resolved', 'closed'
      )),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_incidents_created_at
ON incidents(created_at DESC);
