import { installGlobals } from '@remix-run/node';

// This installs globals such as "fetch", "Response", "Request", "Headers"
// as well as the Remix-specific "FormData" and "URLSearchParams" globals
installGlobals(); 