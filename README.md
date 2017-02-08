# Google Home x Sonos webhook

A node.js, API.API, http webhook that integrates Google Home with Sonos, running on your local wifi. 
This integration uses the Agent backup inside the /agent direcotry

## ** Under development **

## Usage

To invoke this custom API.API [Agent](https://docs.api.ai/docs/concept-agents), tell your Google Home to "talk to my Sonos player". 
This initiates your conversation with Google Home & listens for [Actions](https://docs.api.ai/docs/concept-actions) invoked by specified
[Intents](https://docs.api.ai/docs/concept-intents). Once invoked, the intents trigger this webhook, which then processes the request
and calls the appropriate node-sonos-http-api endpoint. Voilà 

* Play song by artist
* Shuffle artist
* Play album
* Play
* Pause
* Next
* Previous
* Volume up/down

## Full integration
The full Google Home x Sonos player integration requires a few peices of software
* [ngrok](https://ngrok.com/) - create a secure https tunnel w/ public url for API.AI Webhook Fulfillment
* [node-sonos-http-api] - api for controlling your Sonos system
* [API.AI] - natural language processor