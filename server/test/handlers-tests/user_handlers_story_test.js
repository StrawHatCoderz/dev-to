import { assertEquals } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { getUserStories } from "../../src/handlers/user_handlers_story.js";
import { DatabaseSync } from "node:sqlite";
import { initDB } from "../../src/db/init.js";
import { login } from "../../src/handlers/common_handlers.js";
import { createStory } from "../../src/handlers/story_handler.js";

describe("get user stories", () => {
  let database;
  let peterId;
  beforeEach(() => {
    database = new DatabaseSync(":memory:");
    initDB(database);
    peterId = database.prepare(
      `INSERT INTO user (username) VALUES('peter parker 1') RETURNING id`,
    ).run().lastInsertRowid;
  });
  it("=> success should fail when user is not authorized", () => {
    const { success, status } = getUserStories(database, peterId);
    assertEquals(success, false);
    assertEquals(status, 401);
  });

  it("=> should return empty list of stories, drafts when user didn't publish any stories", () => {
    login(database, "peter parker 1");

    const { success, status, stories, drafts } = getUserStories(
      database,
      peterId,
    );
    assertEquals(success, true);
    assertEquals(status, 200);
    assertEquals(stories, []);
    assertEquals(drafts, []);
  });
  it("=> should return stories and empty drafts when only stories are there", () => {
    const storyToCreate = {
      title: "title 1",
      content: "content 1",
      authorId: peterId,
      isPublished: true,
    };
    login(database, "peter parker 1");
    createStory(database, storyToCreate);
    const { success, status, stories, drafts } = getUserStories(
      database,
      peterId,
    );
    const { title, content, author_id } = stories[0];
    assertEquals(success, true);
    assertEquals(status, 200);
    assertEquals(title, "title 1");
    assertEquals(content, "content 1");
    assertEquals(author_id, peterId);
    assertEquals(drafts, []);
  });
  it("=> should return drafts and empty stories when only drafts are there", () => {
    const draftToCreate = {
      title: "title 1",
      content: "content 1",
      authorId: peterId,
      isPublished: false,
    };

    login(database, "peter parker 1");
    createStory(database, draftToCreate);
    const { success, status, stories, drafts } = getUserStories(
      database,
      peterId,
    );
    const { title, content, author_id } = drafts[0];
    assertEquals(success, true);
    assertEquals(status, 200);
    assertEquals(title, "title 1");
    assertEquals(content, "content 1");
    assertEquals(author_id, peterId);
    assertEquals(stories, []);
  });
  it("=> should return drafts and stories when both stories and drafts are there", () => {
    const draftToCreate = {
      title: "title 1",
      content: "content 1",
      authorId: peterId,
      isPublished: false,
    };
    const storyToCreate = {
      title: "title 2",
      content: "content 1",
      authorId: peterId,
      isPublished: true,
    };

    login(database, "peter parker 1");
    createStory(database, draftToCreate);
    createStory(database, storyToCreate);
    const { success, status, stories, drafts } = getUserStories(
      database,
      peterId,
    );
    assertEquals(success, true);
    assertEquals(status, 200);

    assertEquals(stories[0].title, "title 2");
    assertEquals(stories[0].content, "content 1");
    assertEquals(stories[0].author_id, peterId);

    assertEquals(drafts[0].title, "title 1");
    assertEquals(drafts[0].content, "content 1");
    assertEquals(drafts[0].author_id, peterId);

  });
});
