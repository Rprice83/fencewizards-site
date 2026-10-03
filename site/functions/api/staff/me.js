// GET /api/staff/me — who is signed in
import { json } from '../../../server/inbox.js';
export const onRequestGet = ({ data }) => json(data.user);
