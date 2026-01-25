/**
 * Application constants
 */

export const LIMITS = {
    MAX_IMAGES: 10,
    MAX_TITLE_LENGTH: 32,
    VERIFICATION_CODE_MIN: 100000,
    VERIFICATION_CODE_MAX: 999999
};

export const MESSAGES = {
    MAX_IMAGES_EXCEEDED: `Tối đa ${LIMITS.MAX_IMAGES} hình`,
    UPLOAD_SUCCESS: 'Tải lên thành công',
    UPLOAD_FAILED: 'Tải lên thất bại',
    GENERIC_ERROR: 'Đã xảy ra lỗi. Vui lòng thử lại.'
};

/**
 * Generate random verification code
 */
export const generateVerificationCode = () => {
    const { VERIFICATION_CODE_MIN, VERIFICATION_CODE_MAX } = LIMITS;
    return Math.floor(
        VERIFICATION_CODE_MIN + Math.random() * (VERIFICATION_CODE_MAX - VERIFICATION_CODE_MIN)
    ).toString();
};
