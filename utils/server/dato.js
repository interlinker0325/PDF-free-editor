import {buildBlockRecord} from '@datocms/cma-client-node';
import client from "./dato-singleton"

export const createUpload = async (filePath) => {
  try {
    return await client.uploads.createFromLocalFile({localPath: filePath, skipCreationIfAlreadyExists: false});
  } catch (error) {
    console.error(error);
    return {error};
  }
};

export const deleteUpload = async (fileId) => {
  try {
    return await client.uploads.destroy(fileId);
  } catch (error) {
    console.error(error);
    return {error};
  }
};

export const createRecord = async (recordData) => {
  try {
    console.log("CREATING...", recordData)
    return await client.items.create(recordData);
  } catch (error) {
    console.error(error);
    return {error};
  }
};

export const updateRecord = async (recordId, recordData) => {
  try {
    console.log("UPDATING...", recordData)
    Reflect.deleteProperty(recordData, "createdAt")
    Reflect.deleteProperty(recordData, "updatedAt")
    return await client.items.update(`${recordId}`, recordData);
  } catch (error) {
    console.error(error);
    return {error};
  }
};

export const deleteRecord = async (recordId) => {
  try {
    console.log("DELETING...", recordId)
    return await client.items.destroy(`${recordId}`);
  } catch (error) {
    console.error(error);
    return {error};
  }
};

export const publish = async (recordId) => {
  try {
    return await client.items.publish(`${recordId}`);
  } catch (error) {
    console.error(error);
    return {error};
  }
};

export const buildBlock = buildBlockRecord;
