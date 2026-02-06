export const deleteDraft = (draftId, drafts) => {
  const draftIndex = drafts.findIndex(({ draftId: currentDraftId }) =>
    currentDraftId === draftId
  );

  if (draftIndex === -1) {
    return { success: false, status: 400 };
  }

  drafts.splice(draftIndex, 1);
  return { success: true, status: 200 };
};
