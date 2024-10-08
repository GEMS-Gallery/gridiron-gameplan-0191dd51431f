import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'ok' : null } |
  { 'err' : string };
export interface SeasonInfo {
  'endDate' : [] | [string],
  'year' : string,
  'startDate' : [] | [string],
}
export interface _SERVICE {
  'getSeasonInfo' : ActorMethod<[], SeasonInfo>,
  'updateSeasonInfo' : ActorMethod<[SeasonInfo], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
