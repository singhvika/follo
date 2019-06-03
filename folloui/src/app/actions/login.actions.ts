import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Login } from '../models/login.model';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const IS_LOGGED_IN = '[LOGIN] isLoggedIN';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoggedInStatus implements Action {
  readonly type = IS_LOGGED_IN;
  constructor(public payload: boolean) { }
}

export type Actions = LoggedInStatus;
