import * as bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
	return bcrypt.hash(password, 12);
};

export const isPasswordValid = async ({
	password,
	hash,
}: {
	password: string;
	hash: string;
}) => {
	return bcrypt.compare(password, hash);
};
