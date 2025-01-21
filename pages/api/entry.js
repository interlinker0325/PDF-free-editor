import {createRecord, deleteRecord, deleteUpload, updateRecord} from 'utils/server/dato';

export default async (req, res) => {
  let result = {success: false, data: {}};

  if (req.method === 'POST') {
    let {coverimage, coauthors, monograph, attachments, ...rest} = req.body;

    let entry = {
      ...rest,
      itemType: process.env.ENTRY_MODEL_ID,
    };

    entry.coverimage = coverimage ? {upload_id: coverimage.id} : null;
    entry.monograph = monograph ? {upload_id: monograph.id} : null;
    entry.coauthors = coauthors ? coauthors.map(coauthor => coauthor.id) : null;

    if (attachments) {
      if (!Array.isArray(attachments)) attachments = [attachments];
      entry.attachments = attachments.map(file => ({upload_id: file.id}))
    }

    const record = await createRecord(entry);

    if (!record.error) {
      result.success = true;
      result.data = record;
    } else {
      result.error = record.error;
    }
  } else if (req.method === 'PUT') {
    let {id, author = null, course, coverimage, coauthors, monograph, attachments, ...rest} = req.body;

// Conditionally add props if there are values
    if (coverimage) rest.coverimage = { upload_id: coverimage.id };
    if (monograph) rest.monograph = { upload_id: monograph.id };
    if (author) rest.author = author.id || author;
    if (course) rest.course = course.id || course;
    if (Array.isArray(coauthors)) rest.coauthors = coauthors.map(coauthor => coauthor?.id);

    if (attachments) {
      if (!Array.isArray(attachments)) attachments = [attachments];
      rest.attachments = attachments.map(file => ({ upload_id: file.id }));
    }

    const record = await updateRecord(id, rest);

    if (!record.error) {
      result.success = true;
      result.data = record;
    } else {
      result.error = record.error;
    }
  } else if (req.method === 'DELETE') {
    let {id, coverimage, monograph, attachments} = req.body;
    if (attachments) {
      if (!Array.isArray(attachments)) await deleteUpload(attachments.id);
      await Promise.all(attachments.map(file => deleteUpload(file.id)))
    }
    coverimage && await deleteUpload(coverimage.id);
    monograph && await deleteUpload(monograph.id);
    const record = await deleteRecord(id);

    if (!record?.error) {
      result.success = true;
      result.data = record;
    } else {
      result.error = record.error;
    }
  }

  res.json(result);
};
