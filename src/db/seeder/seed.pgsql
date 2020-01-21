INSERT INTO "Profile" ("id", "fullName", "gender", "imageUrl", "bio", "city", "country", "createdAt", "updatedAt") VALUES
  ('eedba438-b789-4e36-8990-1e4c3be76080', 'john doe', 'male', 'https://picsum.photos/200', 'some really cool bio', 'Lagos', 'NG', '2019-01-06T10:04:46.419Z', '2019-01-06T10:04:46.419Z'),
  ('aedba438-b487-4e36-8990-1e4c3be78061', 'sam doe', 'male', 'https://picsum.photos/200', 'some really cool bio', 'Lagos', 'NG', '2019-01-06T10:04:46.419Z', '2019-01-06T10:04:46.419Z'),
  ('bedba438-b795-4e36-8990-1e4c3be78062', 'anna doe', 'female', 'https://picsum.photos/200', 'some really cool bio', 'Lagos', 'NG', '2019-01-06T10:04:46.419Z', '2019-01-06T10:04:46.419Z'),
  ('cedba438-b444-4e36-8990-1e4c3be78063', 'mary doe', 'female', 'https://picsum.photos/200', 'some really cool bio', 'Lagos', 'NG', '2019-01-06T10:04:46.419Z', '2019-01-06T10:04:46.419Z'),
  ('dedba438-b789-4e49-8990-1e4c3be78864', 'tim doe', 'male', 'https://picsum.photos/200', 'some really cool bio', 'Lagos', 'NG', '2019-01-06T10:04:46.419Z', '2019-01-06T10:04:46.419Z');

INSERT INTO "Account" ("id", "email", "password", "publicId", "blocked", "verified", "createdAt", "updatedAt", "profileId") VALUES
  ('eedba437-b789-4e36-8990-1e4c3be78060', 'test.user1@email.com', '$2y$12$1SgplF4gLt.NJ.hijrX4XOuyHDCUuX06DnzfkhwSdYVRxEXfZj1YW', '0387296939', false, true, '2019-01-06T10:04:46.419Z', '2019-01-06T10:04:46.419Z', 'eedba438-b789-4e36-8990-1e4c3be76080'),
  ('6f0b6584-4235-4306-89ab-0b2445da11a4', 'test.user2@email.com', '$2y$10$e8sUmTR9f7ScGhHwgfrzE.VApHROMyk1r/biU1r3.ub5k2nKNe/NO', '5065877762', false, true, '2019-01-06T10:04:46.419Z', '2019-01-06T10:04:46.419Z', 'aedba438-b487-4e36-8990-1e4c3be78061'),
  ('6f0b6584-4235-4306-89ab-0b2445da22a4', 'test.user3@email.com', '$2y$10$wZRWYxM9NEj3Xq/7tb3drOmoXRvx0Srq6BDSETGXIROKZWob6Uq6G', '7749469341', false, true, '2019-01-06T10:04:46.419Z', '2019-01-06T10:04:46.419Z', 'bedba438-b795-4e36-8990-1e4c3be78062'),
  ('6f0b6584-4235-4306-89ab-0b2445da33a4', 'test.user4@email.com', '$2y$10$Mkr.ij74toRPKqh20wWUiuyr150GtBNG9PPyORaIumXnf2xJfwYF2', '1330341323', false, true, '2019-01-06T10:04:46.419Z', '2019-01-06T10:04:46.419Z', 'cedba438-b444-4e36-8990-1e4c3be78063'),
  ('6f0b6584-4235-4306-89ab-0b2445da44a4', 'test.user5@email.com', '$2y$10$ZJAcjQ9UrfwNNP2H6IDC2OyX6X4uxZm0fVeW2xEBApvCMpURMqphm', '7879035512', false, true, '2019-01-06T10:04:46.419Z', '2019-01-06T10:04:46.419Z', 'dedba438-b789-4e49-8990-1e4c3be78864');

INSERT INTO "Admin" ("id", "fullName", "email", "password", "role", "blocked", "verified", "createdAt", "updatedAt") VALUES
  ('eedba437-b789-4e36-8990-1e4c3be78460', 'CoQonect Super Admin', 'superadmin@coqonect.com', '$2y$10$07cOMH68JkrPDR3XTaZEe.ahYpflu1SUGHeBomvkasD2Esv0PSwiq', 'superAdmin', false, true, '2019-01-06T10:04:46.419Z', '2019-01-06T10:04:46.419Z'),
  ('6f0b6584-4235-4306-89ab-0b2445da11a4', 'CoQonect Admin', 'admin@coqonect.com', '$2y$10$olt4/LD9BZdK/IgoX0ZkYOg0DysMf/hxnG6VFRfiQXmgvnZEBVp9C', 'admin', false, true, '2019-01-06T10:04:46.419Z', '2019-01-06T10:04:46.419Z');

INSERT INTO "SkillCategory" ("id", "name") VALUES
  ('864ff6fc-50f2-4d9a-b299-f955b0d19e6f', 'programming'),
  ('3439f2db-626f-4508-8c35-fc6c72809ae4', 'communication');

INSERT INTO "Skill" ("id", "name", "categoryId") VALUES
  ('cb987eb0-a58d-439f-ba7e-8f11575c83a2', 'JavaScript', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('206fd035-c7b8-4f33-be33-9a4c9de81e64', 'Public speaking', '3439f2db-626f-4508-8c35-fc6c72809ae4'),
  ('c3ae52e3-681f-48ca-aa3a-66d22c1ba8e8', 'Effective communication', '3439f2db-626f-4508-8c35-fc6c72809ae4'),
  ('d5775029-2ee7-4c95-a383-75206cb3b406', 'Python', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f');

INSERT INTO "UserSkill" ("id", "skillId", "accountId") VALUES
  ('cb987eb0-a58d-f943-ba7e-8f11575c83a2', 'cb987eb0-a58d-439f-ba7e-8f11575c83a2', 'eedba437-b789-4e36-8990-1e4c3be78060'),
  ('206fd035-c7b8-33f4-be33-9a4c9de81e64', '206fd035-c7b8-4f33-be33-9a4c9de81e64', '6f0b6584-4235-4306-89ab-0b2445da11a4'),
  ('c3ae52e3-681f-ac48-aa3a-66d22c1ba8e8', 'c3ae52e3-681f-48ca-aa3a-66d22c1ba8e8', '6f0b6584-4235-4306-89ab-0b2445da22a4'),
  ('d5775029-2ee7-59c4-a383-75206cb3b406', 'd5775029-2ee7-4c95-a383-75206cb3b406', 'eedba437-b789-4e36-8990-1e4c3be78060');

INSERT INTO "MentorshipRequest" ("id", "accountId", "requestType", "description", "status", "skillId") VALUES
  ('eedba438-b789-4e36-8990-1e4c3be78060', 'eedba437-b789-4e36-8990-1e4c3be78060', 'extensive', 'please be my mentor', 'created', 'cb987eb0-a58d-439f-ba7e-8f11575c83a2'),
  ('eedba438-b784-4e36-8990-1e4c3be78060', 'eedba437-b789-4e36-8990-1e4c3be78060', 'extensive', 'please be my mentor', 'created', 'd5775029-2ee7-4c95-a383-75206cb3b406'),
  ('eedba438-b759-4e36-8990-1e4c3be78060', '6f0b6584-4235-4306-89ab-0b2445da11a4', 'extensive', 'please be my mentor', 'created', 'c3ae52e3-681f-48ca-aa3a-66d22c1ba8e8'),
  ('eedba438-b749-4e36-8990-1e4c3be78060', '6f0b6584-4235-4306-89ab-0b2445da11a4', 'urgent', 'please be my mentor', 'started', 'd5775029-2ee7-4c95-a383-75206cb3b406'),
  ('eedba438-b789-4e36-8990-1e4c3be78070', 'eedba437-b789-4e36-8990-1e4c3be78060', 'extensive', 'please be my mentor', 'created', '206fd035-c7b8-4f33-be33-9a4c9de81e64');

INSERT INTO "mentorship_request_mentors__account" ("mentorshipRequestId", "accountId") VALUES
  ('eedba438-b789-4e36-8990-1e4c3be78060', '6f0b6584-4235-4306-89ab-0b2445da11a4'),
  ('eedba438-b789-4e36-8990-1e4c3be78060', '6f0b6584-4235-4306-89ab-0b2445da22a4'),
  ('eedba438-b789-4e36-8990-1e4c3be78060', '6f0b6584-4235-4306-89ab-0b2445da33a4'),
  ('eedba438-b749-4e36-8990-1e4c3be78060', '6f0b6584-4235-4306-89ab-0b2445da11a4'),
  ('eedba438-b789-4e36-8990-1e4c3be78070', '6f0b6584-4235-4306-89ab-0b2445da44a4');

INSERT INTO "mentorship_request_other_skills__skill" ("mentorshipRequestId", "skillId") VALUES
  ('eedba438-b789-4e36-8990-1e4c3be78060', 'cb987eb0-a58d-439f-ba7e-8f11575c83a2'),
  ('eedba438-b789-4e36-8990-1e4c3be78060', '206fd035-c7b8-4f33-be33-9a4c9de81e64'),
  ('eedba438-b789-4e36-8990-1e4c3be78060', 'c3ae52e3-681f-48ca-aa3a-66d22c1ba8e8'),
  ('eedba438-b749-4e36-8990-1e4c3be78060', '206fd035-c7b8-4f33-be33-9a4c9de81e64'),
  ('eedba438-b789-4e36-8990-1e4c3be78070', 'd5775029-2ee7-4c95-a383-75206cb3b406');

INSERT INTO "PreSession" ("id", "menteeId", "mentorshipRequestId", "status", "refCode", "createdAt") VALUES
  ('aadba438-b789-4e36-8990-1e4c3be44444', 'eedba437-b789-4e36-8990-1e4c3be78060', 'eedba438-b789-4e36-8990-1e4c3be78060', 'available', '1573567970183', '2019-01-06T10:06:46.419Z'),
  ('bbdba438-b789-4e36-8990-1e4c3be78060', 'eedba437-b789-4e36-8990-1e4c3be78060', 'eedba438-b784-4e36-8990-1e4c3be78060', 'available', '1573567970194', '2019-01-06T10:07:46.419Z'),
  ('ccdba438-b789-4e36-8990-1e4c3be78060', '6f0b6584-4235-4306-89ab-0b2445da44a4', 'eedba438-b759-4e36-8990-1e4c3be78060', 'available', '1573567970178', '2019-01-06T10:08:46.419Z');

INSERT INTO "PreSessionNotification" ("id", "senderId", "receiverId", "preSessionId", "read", "createdAt") VALUES
  ('eedba538-b789-4e36-8990-1e4c3be78060', 'eedba437-b789-4e36-8990-1e4c3be78060', '6f0b6584-4235-4306-89ab-0b2445da11a4', 'aadba438-b789-4e36-8990-1e4c3be44444', false, '2019-01-06T10:06:50.419Z'),
  ('eedba638-b789-4e36-8990-1e4c3be78060', '6f0b6584-4235-4306-89ab-0b2445da11a4', '6f0b6584-4235-4306-89ab-0b2445da44a4', 'bbdba438-b789-4e36-8990-1e4c3be78060', false, '2019-01-06T10:06:55.419Z'),
  ('eedba738-b789-4e36-8990-1e4c3be78060', '6f0b6584-4235-4306-89ab-0b2445da44a4', '6f0b6584-4235-4306-89ab-0b2445da44a4', 'ccdba438-b789-4e36-8990-1e4c3be78060', false, '2019-01-06T10:06:47.419Z');