import { Client, ThreadID } from "@textile/hub";

const keyInfo = {
	key: process.env.REACT_APP_TEXTILE_PUBLIC_KEY,
	secret: process.env.REACT_APP_TEXTILE_SECRET,
};

export const getClient = async () => {
	const client = await Client.withKeyInfo(keyInfo);
	return client;
};

export const queryThread = async (client, threadId, collectionName, query) => {
	const results = await client.find(
		ThreadID.fromString(threadId),
		collectionName,
		query
	);
	return results;
};

export const addToThread = async (
	client,
	threadId,
	collectionName,
	instance
) => {
	await client.create(ThreadID.fromString(threadId), collectionName, [
		instance,
	]);
};

export const deleteThread = async (
	client,
	threadId,
	collectionName,
	instanceIds
) => {
	await client.delete(
		ThreadID.fromString(threadId),
		collectionName,
		instanceIds
	);
};
