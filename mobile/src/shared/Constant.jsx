export const THEME_CONSTANT = {
    LIGHT: 'light',
    DARK: 'dark',
};

export const LANGUAGE = {
    en: {title: 'English', code: 'en'},
    ar: {title: 'العربية', code: 'ar'},
};
export const LANGUAGE_CODE_LIST = [LANGUAGE.en.code, LANGUAGE.ar.code];

export const BaseAPIURL = 'http://104.248.131.162/Luyten/public/api/v1';

export const BaseStorageURL = 'http://104.248.131.162/Luyten/storage/app/public/';

export const ThemeVariables = {
    paddingS: 6,
    paddingM: 12,
    paddingL: 18,
    paddingXL: 24,
    paddingXXL: 32,

    fontSizeS: 8,
    fontSizeM: 12,
    fontSizeL: 16,
    fontSizeXL: 18,
    fontSizeXXL: 24,
    fontSizeXXXL: 32,
};

export const emptyDataArray = {
    id: 0,
    title: null,
    description: null,
    file_path: null,
    user_identifier: null,
    created_at: null,
    updated_at: null,
    deleted_at: null,
    creator: {
        id: null,
        username: null,
        email: null,
        email_verified_at: null,
        role_identifier: null,
        created_at: null,
        updated_at: null,
        deleted_at: null,
    },
};