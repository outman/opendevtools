import Dexie from 'dexie';

export const db = new Dexie('GetInspired');
db.version(1).stores({
    sessions: '&sessionId, tt',
});
