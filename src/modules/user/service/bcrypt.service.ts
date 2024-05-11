import bcrypt from "bcrypt";

export const bcryptService = {
  async generateHash(password: string) {
    const salt = await bcrypt.genSalt(10);
    return { password: await bcrypt.hash(password, salt), passHash: salt };
  },
  async checkPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  },
};
