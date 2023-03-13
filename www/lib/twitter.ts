import { Client } from "twitter-api-sdk"

const token = process.env.TWITTER_BEARER_TOKEN
if (!token) throw new Error("TWITTER_BEARER_TOKEN is not defined")

const client = new Client(token)

export default client
