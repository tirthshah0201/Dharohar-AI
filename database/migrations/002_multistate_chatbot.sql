-- ============================================
-- Dharohar AI — Multi-State + Chatbot Migration
-- ============================================
-- Adds: supported_states, chatbot_knowledge, conversations, ml_training_data
-- ============================================

-- ---- Supported States ----
CREATE TABLE IF NOT EXISTS supported_states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(10) NOT NULL UNIQUE,
    region VARCHAR(50) NOT NULL,
    description TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_states_code ON supported_states(code);
CREATE INDEX IF NOT EXISTS idx_states_region ON supported_states(region);

-- ---- Chatbot Knowledge Base ----
CREATE TABLE IF NOT EXISTS chatbot_knowledge (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    state_code VARCHAR(10) REFERENCES supported_states(code),
    heritage_name VARCHAR(255) NOT NULL,
    heritage_type VARCHAR(50) NOT NULL,
    city VARCHAR(255),
    historical_period VARCHAR(255),
    description TEXT NOT NULL,
    significance TEXT,
    related_event TEXT,
    related_person TEXT,
    related_craft TEXT,
    keywords TEXT[],
    aliases TEXT[],
    chatbot_question_examples TEXT[],
    source VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_knowledge_state ON chatbot_knowledge(state_code);
CREATE INDEX IF NOT EXISTS idx_knowledge_type ON chatbot_knowledge(heritage_type);
CREATE INDEX IF NOT EXISTS idx_knowledge_name ON chatbot_knowledge USING gin(to_tsvector('english', heritage_name));

-- Full-text search on knowledge base
CREATE INDEX IF NOT EXISTS idx_knowledge_search ON chatbot_knowledge
    USING gin(to_tsvector('english', heritage_name || ' ' || COALESCE(description, '') || ' ' || COALESCE(significance, '')));

-- ---- Conversations ----
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(255),
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conversation_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    intent VARCHAR(100),
    state_code VARCHAR(10),
    knowledge_ids UUID[],
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation ON conversation_messages(conversation_id);
