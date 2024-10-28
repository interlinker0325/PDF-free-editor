export const POST_REVIEW_STATUS = {
  APPROVED: 'Aprobado',
  DENIED: 'Denegado',
  PENDING: 'Pendiente',
  DRAFT: "Borrador"
};

export const isPostApproved = post => post.review === POST_REVIEW_STATUS.APPROVED;

export const isPostDenied = post => post.review === POST_REVIEW_STATUS.DENIED;

export const isPostPending = post => post.review === POST_REVIEW_STATUS.PENDING;

export const isPostDraft = post => post.review === POST_REVIEW_STATUS.DRAFT;

export const isPostDraftOrDeclined = post => isPostDraft(post) || isPostDenied(post);
