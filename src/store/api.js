import { createAction } from '@reduxjs/toolkit';

export const loginAPICall = createAction('api/auth_login');
export const reIssueAPICall = createAction('api/auth_reIssue');
export const logoutAPICall = createAction('api/auth_logout');
