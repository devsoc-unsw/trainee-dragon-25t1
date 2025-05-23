import { ObjectId } from 'mongodb';
import { setData, setSessions } from '../dataStore';

export function clear() {
  setSessions([]);
  setData({
    users: [],
    spots: [],
    _id: new ObjectId(),
  });
  return {};
}
