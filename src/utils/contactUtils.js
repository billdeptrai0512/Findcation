/**
 * Reads the URL from a contact value — handles both formats:
 *   old flat:   { facebook: "billdeptrai0512" }
 *   new object: { facebook: { url: "billdeptrai0512", verify: true, code: "XK7F2A" } }
 *
 * Usage:
 *   import { getContactUrl, isContactVerified } from "../../utils/contactUtils";
 *   const url = getContactUrl(host.contacts.facebook);
 */

export function getContactUrl(value) {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value.url ?? "";
}

export function isContactVerified(value) {
    if (!value || typeof value === "string") return false;
    return value.verify === true;
}
