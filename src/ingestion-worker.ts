import { KinesisStreamEvent, KinesisStreamRecord } from "aws-lambda";
import kinesisToJson from "./lib/kinesis-to-json";

// for each kinesis record in the batch, put record into sqs
const processBatch = async (record: KinesisStreamRecord) => {
  const item = kinesisToJson<any>(record?.kinesis?.data);
  console.log("item.action :::", item.action);
};

export default async (event: KinesisStreamEvent) => {
  await Promise.all(event.Records.map(processBatch));
};
