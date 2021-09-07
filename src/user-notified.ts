import { SNSEventRecord, SNSEvent } from "aws-lambda";
import { getRandomIntFromRange } from "./lib/getRandomIntFromRange";
import { work } from "./lib/work";

const processEvent = async (record: SNSEventRecord) => {
  console.log("::: SQS RECORD BODY :::", record);

  const workInterval = getRandomIntFromRange(100, 2000);

  console.log(workInterval);

  await work(workInterval);
};

export default async (event: SNSEvent) => {
  await Promise.all(event.Records.map(processEvent));
};
