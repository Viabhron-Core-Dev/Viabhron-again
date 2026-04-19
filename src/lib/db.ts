import Dexie, { type Table } from 'dexie';
import { Agent, Secret, Extension, CelestialChat } from '../types';

export class ViabhronDB extends Dexie {
  agents!: Table<Agent>;
  secrets!: Table<Secret>;
  extensions!: Table<Extension>;
  chats!: Table<CelestialChat>;

  constructor() {
    super('ViabhronDB');
    this.version(1).stores({
      agents: 'id, name, role, isStaff',
      secrets: 'id, label, type',
      extensions: 'id, name',
      chats: 'id, name, type'
    });
  }
}

export const db = new ViabhronDB();
