CREATE TABLE IF NOT EXISTS "Profile" (
  id uuid PRIMARY KEY,
  "fullName" character varying NOT NULL,
  gender character varying,
  "imageUrl" character varying,
  bio text,
  city character varying,
  country character varying,
  "createdAt" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  "updatedAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
);

CREATE TABLE IF NOT EXISTS "Rating" (
  id uuid PRIMARY KEY,
  "totalRatings" integer NOT NULL DEFAULT 0,
  "ratingCount" integer NOT NULL DEFAULT 0,
  average double precision
);

CREATE TABLE IF NOT EXISTS "Account" (
  id uuid PRIMARY KEY,
  email character varying(255) NOT NULL UNIQUE,
  password character varying(255) NOT NULL,
  "publicId" character varying(255) NOT NULL,
  blocked boolean NOT NULL DEFAULT false,
  verified boolean NOT NULL DEFAULT false,
  "createdAt" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  "updatedAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  "profileId" uuid REFERENCES "Profile"(id) ON DELETE CASCADE UNIQUE,
  "ratingId" uuid REFERENCES "Rating"(id) ON DELETE CASCADE UNIQUE
);

CREATE TABLE IF NOT EXISTS "SkillCategory" (
  id uuid PRIMARY KEY,
  name character varying NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS "Skill" (
  id uuid PRIMARY KEY,
  name character varying(255) NOT NULL UNIQUE,
  "categoryId" uuid REFERENCES "SkillCategory"(id)
);

CREATE TABLE IF NOT EXISTS "MentorshipRequest" (
  id uuid PRIMARY KEY,
  "requestType" character varying NOT NULL DEFAULT 'urgent'::character varying,
  status character varying NOT NULL DEFAULT 'created'::character varying,
  description text,
  "createdAt" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  "accountId" uuid REFERENCES "Account"(id),
  "skillId" uuid REFERENCES "Skill"(id)
);

CREATE TABLE IF NOT EXISTS "Admin" (
  id uuid PRIMARY KEY,
  email character varying(255) NOT NULL UNIQUE,
  password character varying(255) NOT NULL,
  "fullName" character varying(255) NOT NULL,
  role character varying NOT NULL DEFAULT 'admin'::character varying,
  verified boolean NOT NULL DEFAULT false,
  blocked boolean NOT NULL DEFAULT false,
  "createdAt" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  "updatedAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
);

CREATE TABLE IF NOT EXISTS "MainSession" (
  id uuid PRIMARY KEY,
  "menteeId" uuid NOT NULL REFERENCES "Account"(id),
  "mentorId" uuid NOT NULL REFERENCES "Account"(id),
  "mentorshipRequestId" uuid NOT NULL REFERENCES "MentorshipRequest"(id),
  status character varying NOT NULL DEFAULT 'started'::character varying,
  "refCode" character varying NOT NULL,
  "startedAt" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  "endedAt" timestamp without time zone
);

CREATE TABLE IF NOT EXISTS mentorship_request_mentors__account (
  "mentorshipRequestId" uuid REFERENCES "MentorshipRequest"(id) ON DELETE CASCADE,
  "accountId" uuid REFERENCES "Account"(id) ON DELETE CASCADE,
  CONSTRAINT "PK_27bc5155c6627c8b5ca03b0bf46" PRIMARY KEY ("mentorshipRequestId", "accountId")
);

CREATE TABLE IF NOT EXISTS "UserSkill" (
  id uuid PRIMARY KEY,
  "skillId" uuid NOT NULL REFERENCES "Skill"(id),
  "accountId" uuid NOT NULL REFERENCES "Account"(id),
  verified boolean NOT NULL DEFAULT false,
  description text,
  CONSTRAINT "UQ_962a594a1c0b7a96a3ec0f06e96" UNIQUE ("skillId", "accountId")
);

CREATE TABLE IF NOT EXISTS mentorship_request_other_skills__skill (
  "mentorshipRequestId" uuid REFERENCES "MentorshipRequest"(id) ON DELETE CASCADE,
  "skillId" uuid REFERENCES "Skill"(id) ON DELETE CASCADE,
  CONSTRAINT "PK_2240a60cfb50c36aa43a8be2e2c" PRIMARY KEY ("mentorshipRequestId", "skillId")
);

CREATE TABLE IF NOT EXISTS "MentorToMenteeNotification" (
  id uuid PRIMARY KEY,
  "senderId" uuid NOT NULL REFERENCES "Account"(id),
  "receiverId" uuid NOT NULL REFERENCES "Account"(id),
  "mentorshipRequestId" character varying NOT NULL,
  read boolean NOT NULL DEFAULT false,
  "createdAt" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT "UQ_f06041dc05ae033bf2c5132f440" UNIQUE ("senderId", "receiverId", "mentorshipRequestId")
);

CREATE TABLE IF NOT EXISTS "PreSession" (
  id uuid PRIMARY KEY,
  "menteeId" uuid NOT NULL REFERENCES "Account"(id),
  "mentorshipRequestId" uuid NOT NULL REFERENCES "MentorshipRequest"(id),
  status character varying NOT NULL DEFAULT 'available'::character varying,
  "refCode" character varying NOT NULL,
  "createdAt" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT "UQ_458411690103f610226d9a9bdc2" UNIQUE ("menteeId", "mentorshipRequestId")
);

CREATE TABLE IF NOT EXISTS "PreSessionNotification" (
  id uuid PRIMARY KEY,
  "senderId" uuid NOT NULL REFERENCES "Account"(id),
  "receiverId" uuid NOT NULL REFERENCES "Account"(id),
  "preSessionId" character varying NOT NULL,
  read boolean NOT NULL DEFAULT false,
  "createdAt" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT "UQ_e3ee89b03af88fb0356bb0aef2c" UNIQUE ("senderId", "receiverId", "preSessionId")
);
