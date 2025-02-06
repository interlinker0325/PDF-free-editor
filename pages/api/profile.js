import {publish, updateRecord,} from 'utils/server/dato';

export default async (req, res) => {
  let result = {success: false, data: {}};
  if (req.method === 'PUT') {
    let {id, avatar, ...profileData} = req.body;
    if (avatar) {
      profileData.avatar = {upload_id: avatar};
    }
    console.log("profile mfucka", {profileData})
    const record = await updateRecord(id, profileData);

    if (!record.error) {
      await publish(record.id);
      result.success = true;
      result.data = record;
    } else {
      result.error = record.error;
    }
  }

  res.json(result);
};

