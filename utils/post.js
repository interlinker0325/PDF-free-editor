export const POST_REVIEW_STATUS = {
    APPROVED: 'Aprobado',
    DENIED: 'Denegado',
    PENDING: 'Pendiente'
};

export const isPostApproved = post => post.review === POST_REVIEW_STATUS.APPROVED;

export const isPostDenied = post => post.review === POST_REVIEW_STATUS.DENIED;

export const isPostPending = post => post.review === POST_REVIEW_STATUS.PENDING;