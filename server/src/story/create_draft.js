export const createDraft = (title, content, draftId, authorId) => {
  return {
    id: draftId,
    authorId,
    title,
    content,
  };
};

export const createDraftHandler = (draftToCreate, drafts) => {
  const { title, content, authorId } = draftToCreate;
  const isValidContent = ![content.trim().length, title.trim().length].includes(0);

  if (!isValidContent) {
    return { success: false, status: 400 };
  }

  const draftId = drafts.length + 1;
  const story = createDraft(title, content, draftId, authorId);
  drafts.push(story);

  return { success: true, status: 200 };
};
