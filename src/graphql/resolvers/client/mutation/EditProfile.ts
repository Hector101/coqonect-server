import winstonEnvLogger from 'winston-env-logger';
import { getConnection } from 'typeorm';

import { Account, Profile } from '../../../../db';

// interface
import ResolverType from '../../../../interfaces/IResolverType';

const EditProfile: ResolverType = async (_parent, {
  city, country, bio, fullName,
}, { req: { decoded: { id: accountId } } }) => {
  try {
    const account = await Account.findOne({
      where: { id: accountId },
      relations: ['profile'],
    });

    if (!account) {
      throw Error('Account does not exist');
    }

    await getConnection()
      .createQueryBuilder()
      .update(Profile)
      .set({
        fullName,
        city,
        country,
        bio,
      })
      .where('id = :id', { id: account.profile.id })
      .execute();

    return { message: 'skill added successfully' };
  } catch (e) {
    winstonEnvLogger.error({
      message: 'An Error occurred',
      error: e,
    });

    throw new Error(e);
  }
};

export default EditProfile;
