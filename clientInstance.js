// Import ComposeDB client

import { ComposeClient } from "@composedb/client";
import { DID } from "dids";
import { getResolver } from "key-did-resolver";
import { Ed25519Provider } from "key-did-provider-ed25519";

// Import your compiled composite
import Composite from "./composites/runtime-composite.json";
// Create an instance of ComposeClient
// Pass the URL of your Ceramic server
// Pass reference to your compiled composite

const compose = new ComposeClient({
  ceramic: "http://localhost:7007",
  definition: Composite,
});

// Use the Web Crypto API to generate a random 32-byte seed
const seed = window.crypto.getRandomValues(new Uint8Array(32));

// `seed` must be a 32-byte long Uint8Array
async function authenticateDID(seed) {
  const provider = new Ed25519Provider(seed);
  const did = new DID({ provider, resolver: getResolver() });
  await did.authenticate();
  compose.setDID(did);
  return did;
}
