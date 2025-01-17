import { IFlagsmith } from './types';

import fetch from "unfetch"
// @ts-expect-error
import AsyncStorage from "@callstack/async-storage";
import core, { LikeFetch } from './flagsmith-core';
// @ts-expect-error
import EventSource from 'reconnecting-eventsource'
// @ts-expect-error
const _fetch = fetch as LikeFetch

const flagsmith = core({AsyncStorage, fetch:_fetch, eventSource:EventSource});

export default flagsmith;
export const createFlagsmithInstance = ():IFlagsmith=>{
    return core({AsyncStorage, fetch:_fetch, eventSource:EventSource})
}
