import { tap } from 'rxjs/operators';

export const log = (...args: any[]) => tap((source: any) => console.log(...args, source));

