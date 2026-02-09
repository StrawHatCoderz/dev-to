export const isIdExistInTheSession = (id, users) => {
  return users.some((user) => user.id === id);
};

export const retrieveDraftsById = (id, allDrafts) => {
  const drafts = [];
  for (const draft of allDrafts) {
    if (draft.userId === id) drafts.push(draft);
  }

  return drafts;
};

export const getDraftsHandler = (id, session, allDrafts) => {
  if (!isIdExistInTheSession(id, session)) {
    return { success: false, status: 401 };
  }

  const drafts = retrieveDraftsById(id, allDrafts);
  return { success: true, drafts, status: 200 };
};