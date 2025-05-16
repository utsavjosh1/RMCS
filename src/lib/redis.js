// src/lib/redis.ts
import { Redis } from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  // Enable TLS in production
  tls: process.env.NODE_ENV === 'production' ? {} : undefined,
});

export { redis };

// src/lib/session-manager.ts
import { redis } from './redis';

const SESSION_PREFIX = 'session:';
const SESSION_TTL = 30 * 60; // 30 minutes in seconds

class SessionManager {
  private getSessionKey(userId) {
    return `${SESSION_PREFIX}${userId}`;
  }

  async setSession(userId, sessionData) {
    const key = this.getSessionKey(userId);
    await redis.setex(key, SESSION_TTL, JSON.stringify(sessionData));
  }

  async getSession(userId) {
    const key = this.getSessionKey(userId);
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async removeSession(userId) {
    const key = this.getSessionKey(userId);
    await redis.del(key);
  }

  async updateSessionActivity(userId) {
    const key = this.getSessionKey(userId);
    await redis.expire(key, SESSION_TTL);
  }

  async addActiveRoom(userId, roomCode) {
    const session = await this.getSession(userId);
    if (!session) {
      throw new Error("Session not found");
    }

    if (!session.activeRooms) {
      session.activeRooms = [];
    }

    if (!session.activeRooms.includes(roomCode)) {
      session.activeRooms.push(roomCode);
      await this.setSession(userId, session);
    }
  }

  async removeActiveRoom(userId, roomCode) {
    const session = await this.getSession(userId);
    if (session) {
      session.activeRooms = session.activeRooms.filter(
        (room) => room !== roomCode
      );
      await this.setSession(userId, session);
    }
  }
}

export const sessionManager = new SessionManager();