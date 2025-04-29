import { setData, setSessions } from '../dataStore';

export function clear() {
  setSessions([]);
  setData({ users: [] });
  return {};
}
