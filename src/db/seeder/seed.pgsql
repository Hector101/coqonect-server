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
  ('864ff6fc-50f2-4d9a-b299-f955b0d19e6f', 'Programming'),
  ('3439f2db-626f-4508-8c35-fc6c72809ae4', 'Communication'),
  ('b6f22a28-6820-4984-bc9d-75d3ea233b6b', 'Language'),
  ('797aae41-f842-47ef-913a-32e60a92acf5', 'Designs');

INSERT INTO "Skill" ("id", "name", "categoryId") VALUES
  ('cb987eb0-a58d-439f-ba7e-8f11575c83a2', 'JavaScript', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('d5775029-2ee7-4c95-a383-75206cb3b406', 'Python', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('b9bebd20-0ee6-462d-88fc-751613e2937d', 'ReactJS', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('7949cc9d-8d16-410c-9a11-80f618009333', 'Angular', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('d0ef79a1-4474-47f7-bb03-dd20160d533c', 'Ruby on Rails', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('8810045e-4cae-451f-b34f-3b8a85dea302', 'VueJS', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('33349ab5-695d-49a0-a4f1-d37f49cbd7e8', 'Database Design', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('2d1fb9b8-95dd-456f-a9e8-b4b7e5deda2b', 'Data Science', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('a753e70c-5951-4550-9da5-b239ae412136', 'NextJS', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('a7a2bb20-a33d-460c-901b-9506b6a8ed7c', 'Algorithms', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('789e0b33-69c1-4881-9eb3-59b82a4b50e4', 'Advanced HTML/CSS', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f')
  ('7ec20d81-a9f6-43f2-827c-532d8e683061', 'NodeJS', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('ca05ab9e-2971-480d-96c9-f83116595765', 'Rust', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('f222ef95-48a9-4d63-aca4-1816b8858c07', 'Flutter/Dart', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('093d35c9-5f33-4018-813f-7ba7b9251e11', 'Golang', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('9bc37281-f4d0-467d-b8c3-39aa1a61403e', 'Java', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('cbf0206c-371d-4377-9e6a-908520feb306', 'C++', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('07ffa045-2b47-4622-ba0e-b7509c3e6094', 'C', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('7bdc604a-ead2-40d5-9942-b6ea66754320', 'Swift', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('4f54909f-2b2a-484f-b808-864ca6ebb08a', 'Kotlin', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('9e32376c-61e8-43ba-8c96-983fed20645c', 'Logic', '864ff6fc-50f2-4d9a-b299-f955b0d19e6f'),
  ('206fd035-c7b8-4f33-be33-9a4c9de81e64', 'Public speaking', '3439f2db-626f-4508-8c35-fc6c72809ae4'),
  ('c3ae52e3-681f-48ca-aa3a-66d22c1ba8e8', 'Effective communication', '3439f2db-626f-4508-8c35-fc6c72809ae4'),
  ('302fefce-07af-44a0-b458-9ab56a1ac475', 'Attention to Detail', '3439f2db-626f-4508-8c35-fc6c72809ae4'),
  ('bbb18b53-3db7-4836-9c88-0fcb92bcbcd8', 'Abstract Thinking', '3439f2db-626f-4508-8c35-fc6c72809ae4'),
  ('3f78aa30-009d-4053-b646-afad75c06b18', 'Communication and Empathy', '3439f2db-626f-4508-8c35-fc6c72809ae4'),
  ('06a71b93-9f8f-4ed9-95ec-48b5a4c656fc', 'Writing Skills', '3439f2db-626f-4508-8c35-fc6c72809ae4'),
  ('54bf933e-22ea-4f64-854f-6b1b6abea298', 'Effective Collaboration', '3439f2db-626f-4508-8c35-fc6c72809ae4'),
  ('ba2bfa07-ef8e-4768-8357-cbec2a5e9db1', 'Giving and Receiving Feedback', '3439f2db-626f-4508-8c35-fc6c72809ae4'),
  ('1649770b-d5cf-4117-ab7c-18f64d5768d1', 'English', 'b6f22a28-6820-4984-bc9d-75d3ea233b6b'),
  ('d20b4716-912f-469e-ad7b-15c37cc9cb1b', 'French', 'b6f22a28-6820-4984-bc9d-75d3ea233b6b'),
  ('2180f2b9-7849-433b-9905-f4f38b4184c5', 'Spanish', 'b6f22a28-6820-4984-bc9d-75d3ea233b6b'),
  ('987bb3e6-5c35-4e66-9d73-253e3ff679ac', 'German', 'b6f22a28-6820-4984-bc9d-75d3ea233b6b'),
  ('a84983a1-6bdb-4446-9e49-e03f0dfb9b7e', 'Portuguese', 'b6f22a28-6820-4984-bc9d-75d3ea233b6b'),
  ('f008cde9-057b-4a79-a740-0a464fd88d57', 'Afrikaans', 'b6f22a28-6820-4984-bc9d-75d3ea233b6b'),
  ('2a7d2aee-eb4e-4464-bff8-ecbbbe941164', 'Yoruba', 'b6f22a28-6820-4984-bc9d-75d3ea233b6b'),
  ('8f8a7c63-480b-447b-864a-eeb51112781f', 'Igbo', 'b6f22a28-6820-4984-bc9d-75d3ea233b6b'),
  ('4bc2f11a-6f68-4119-ba41-f16a89c9fd70', 'Pidgin English', 'b6f22a28-6820-4984-bc9d-75d3ea233b6b'),
  ('d98e4f38-9600-49b2-9782-4df6aac130c5', 'Hausa', 'b6f22a28-6820-4984-bc9d-75d3ea233b6b'),
  ('f1e4263e-5d58-4896-aabf-a8deb614e10e', 'Swahili', 'b6f22a28-6820-4984-bc9d-75d3ea233b6b'),
  ('8b4674f0-1ee2-46f6-b443-8ebf62910024', 'Zulu', 'b6f22a28-6820-4984-bc9d-75d3ea233b6b'),
  ('8e4cd226-3daf-45c2-9ae0-82182807e3ff', 'UX Design', '797aae41-f842-47ef-913a-32e60a92acf5'),
  ('ab314826-16bb-4fa9-8a5e-e52e96492890', 'Photoshop', '797aae41-f842-47ef-913a-32e60a92acf5'),
  ('29bb0f3e-7465-4dbc-8042-322ac8ea6020', 'Gimp', '797aae41-f842-47ef-913a-32e60a92acf5'),
  ('7fe60b17-e08e-4f14-a2c4-9cb3b85c5940', 'Sketch', '797aae41-f842-47ef-913a-32e60a92acf5'),
  ('a5148905-23a7-4fae-a7db-9d4d0553ff36', 'Adobe XD', '797aae41-f842-47ef-913a-32e60a92acf5'),
  ('f11e2bf8-c77c-461b-95a2-17355bdc2f99', 'Corel Draw Design', '797aae41-f842-47ef-913a-32e60a92acf5'),
  ('fd915864-b8fb-485b-bf3f-0e57b38ce181', 'UI Research', '797aae41-f842-47ef-913a-32e60a92acf5'),
  ('c88ca54b-45db-4cf3-8e52-4c7279ae7e4a', 'Mockup Design', '797aae41-f842-47ef-913a-32e60a92acf5'),
  ('11d2471b-f4e1-4a2c-98b8-1a4f63376a34', 'Engineering Design', '797aae41-f842-47ef-913a-32e60a92acf5');

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